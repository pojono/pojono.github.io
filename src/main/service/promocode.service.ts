import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailSend } from '../../email/email.send.interface';
import { EmailTransport } from '../../email/email.transport';
import { HtmlRender } from '../../email/html.render';
import { PdfRender } from '../../email/pdf.render';
import { ErrorIf } from '../../lib/error.if';
import {
  PROMOCODE_ALREADY_USED,
  PROMOCODE_ALREADY_USED_BY_THIS_USER,
  PROMOCODE_INCORRECT_SYMBOLS,
  PROMOCODE_NOT_FOUND,
  PROMOCODE_PAYMENT_NOT_FOUND,
} from '../../lib/errors';
import { logger } from '../../lib/logger';
import { PaymentStatus } from '../../lib/payment.status';
import { getMonthText } from '../../lib/promocode.month.text';
import { promocodeSymbols } from '../../lib/promocode.symbols';
import { randomInteger, randomString } from '../../lib/random.functions';
import { generateSignature } from '../../lib/signature';
import { Telegram } from '../../lib/telegram';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { PromocodeActivateRequestDto } from '../dto/promocode.activate.request.dto';
import { PromocodeBuyRequestDto } from '../dto/promocode.buy.request.dto';
import { PromocodeWebhookDto } from '../dto/promocode.webhook.dto';
import { Promocode } from '../entity/promocode.entity';
import { PromocodeHistory } from '../entity/promocode.history.entity';
import { PaymentMethodEnum } from '../payment.method.enum';
import { PromocodeHistoryRepository } from '../repository/promocode.history.repository';
import { PromocodeRepository } from '../repository/promocode.repository';
import * as config from 'config';
import { PromocodeWebhookRepository } from '../repository/promocode.webhook.repository';

const emailTransport = new EmailTransport();

@Injectable()
export class PromocodeService {
  constructor(
    @InjectRepository(PromocodeRepository)
    private promocodeRepository: PromocodeRepository,

    @InjectRepository(PromocodeHistoryRepository)
    private promocodeHistoryRepository: PromocodeHistoryRepository,

    @InjectRepository(PromocodeWebhookRepository)
    private promocodeWebhookRepository: PromocodeWebhookRepository,

    private userService: UserService,
  ) {}

  async activatePromocode(
    promocodeActivateRequestDto: PromocodeActivateRequestDto,
  ): Promise<void> {
    const promocode: Promocode = await this.promocodeRepository.findByText(
      promocodeActivateRequestDto.promocode,
    );
    ErrorIf.isEmpty(promocode, PROMOCODE_NOT_FOUND);
    ErrorIf.isEmpty(promocode.paymentDate, PROMOCODE_PAYMENT_NOT_FOUND);

    let user: User = await this.userService.getUserByPhone(
      promocodeActivateRequestDto.phone,
    );

    if (user) {
      const promocodeHistory: PromocodeHistory = await this.promocodeHistoryRepository.getByUserIdAndPromocodeId(
        promocode.id,
        user.id,
      );
      ErrorIf.isExist(promocodeHistory, PROMOCODE_ALREADY_USED_BY_THIS_USER);
    }

    if (!user) {
      user = await this.userService.createUserByPhone(
        promocodeActivateRequestDto.phone,
      );
    }

    await this.decrementAmount(promocode);
    await this.userService.activatePromocode(user, promocode);

    await this.promocodeHistoryRepository.createPromocodeHistory({
      promocodeId: promocode.id,
      userId: user.id,
    });
  }

  async webhook(
    requestId: string,
    promocodeWebhookDto: PromocodeWebhookDto,
  ): Promise<void> {
    await Telegram.sendMessage(
      '🎁 Payment for certificate: ' + JSON.stringify(promocodeWebhookDto),
      requestId,
    );

    if (!promocodeWebhookDto.OrderId) {
      return;
    }

    await this.promocodeWebhookRepository.createPromocodeWebhook(
      Number(promocodeWebhookDto.OrderId),
      JSON.stringify(promocodeWebhookDto),
    );

    const promocodeId: number = Number(promocodeWebhookDto.OrderId);
    const promocode: Promocode = await this.promocodeRepository.findOne(
      promocodeId,
    );

    if (!promocode) {
      logger(requestId).log('Promocode not found!'); // tslint:disable-line
    }

    const payload = promocodeWebhookDto;
    const password: string = config.get('terminalPassword');
    const checkToken = generateSignature({
      payload,
      password,
    });

    logger(requestId).log('1 ' + checkToken);
    logger(requestId).log('2 ' + promocodeWebhookDto.Token); // tslint:disable-line

    if (checkToken !== promocodeWebhookDto.Token) {
      logger(requestId).log('Check failed!'); // tslint:disable-line
      return;
    }

    if (promocode && promocodeWebhookDto.Status === PaymentStatus.CONFIRMED) {
      await this.promocodeRepository.confirmPayment(promocode);

      const resetLink = 'test';
      const html: string = await HtmlRender.renderGiftEmail({
        resetLink,
      });

      const content: Buffer = await this.getCertificate(promocode);
      const emailData: EmailSend = {
        recipientEmails: [promocode.email],
        subject: 'Подарочный сертификат на Prosto App',
        payload: 'Поздравительное письмо',
        html,
        requestId,
        userId: 0,
        attachments: [
          {
            content,
            filename: 'certificate.pdf',
          },
        ],
      };
      await emailTransport.send(emailData);
    }
  }

  async buyPromocode(
    promocodeBuyRequestDto: PromocodeBuyRequestDto,
    requestId: string,
  ): Promise<Promocode> {
    if (promocodeBuyRequestDto.isCorporate) {
      if (promocodeBuyRequestDto.text) {
        promocodeBuyRequestDto.text = promocodeBuyRequestDto.text.toUpperCase();
        const isValidText = promocodeBuyRequestDto.text
          .split('')
          .every(letter => promocodeSymbols.includes(letter));
        ErrorIf.isFalse(isValidText, PROMOCODE_INCORRECT_SYMBOLS);
      }

      promocodeBuyRequestDto.text = promocodeBuyRequestDto.text
        ? promocodeBuyRequestDto.text.toUpperCase() +
          randomInteger(1000, 9999).toString()
        : randomString(6);
    } else {
      promocodeBuyRequestDto.text = randomString(6);
    }

    const promocode: Promocode = await this.promocodeRepository.createPromocode(
      promocodeBuyRequestDto,
    );

    if (promocodeBuyRequestDto.method === PaymentMethodEnum.BILL) {
      const content: Buffer = await this.getCertificate(promocode);
      const emailData: EmailSend = {
        recipientEmails: [config.get('managerEmail')],
        subject: 'Новая заявка на корпоративную подписку',
        payload:
          `Вам заявка на подписку c оплатой по счету на ${promocodeBuyRequestDto.months} месяцев.\n` +
          `Email: ${
            promocodeBuyRequestDto.email
              ? promocodeBuyRequestDto.email
              : 'отсутствует'
          }\n` +
          `Phone: ${
            promocodeBuyRequestDto.phone
              ? promocodeBuyRequestDto.phone
              : 'отсутствует'
          }\n` +
          `Цена: ${
            promocodeBuyRequestDto.price
              ? promocodeBuyRequestDto.price
              : 'отсутствует'
          }\n` +
          `Cкидка: ${
            promocodeBuyRequestDto.discount
              ? promocodeBuyRequestDto.discount.toString() + '%'
              : 'отсутствует'
          }\n` +
          `Cкидка корпоративная: ${
            promocodeBuyRequestDto.discountCorporation
              ? promocodeBuyRequestDto.discountCorporation.toString() + '%'
              : 'отсутствует'
          }\n` +
          `Желаемый промокод: ${
            promocodeBuyRequestDto.text
              ? promocodeBuyRequestDto.text
              : 'отсутствует'
          }` +
          `\nКоличество подписок: ${promocodeBuyRequestDto.amountTotal}`,
        requestId,
        userId: 0,
        attachments: [
          {
            content,
            filename: 'certificate.pdf',
          },
        ],
      };
      await emailTransport.send(emailData);
    }
    return promocode;
  }

  async getCertificate(promocode: Promocode): Promise<Buffer> {
    const monthsText: string = getMonthText(promocode.months);
    const pdfHtml: string = await HtmlRender.renderGiftCertificate({
      text: promocode.text,
      months: promocode.months,
      monthsText,
    });
    return PdfRender.renderPdf(pdfHtml);
  }

  async generateCertificate(id: number, text: string): Promise<Buffer> {
    const promocode: Promocode = await this.promocodeRepository.findOne(id);
    ErrorIf.isEmpty(promocode.paymentDate, PROMOCODE_PAYMENT_NOT_FOUND);
    return this.getCertificate(promocode);
  }

  async generateCertificateTest(id: number): Promise<Buffer> {
    const promocode: Promocode = await this.promocodeRepository.findOne(id);
    ErrorIf.isEmpty(promocode, PROMOCODE_NOT_FOUND);
    return this.getCertificate(promocode);
  }

  async decrementAmount(promocode: Promocode) {
    ErrorIf.isTrue(promocode.amountLeft <= 0, PROMOCODE_ALREADY_USED);
    await this.promocodeRepository.decrementAmount(promocode);
  }

  async getPromocodeById(id: number): Promise<Promocode> {
    return this.promocodeRepository.findOne(id);
  }
}
