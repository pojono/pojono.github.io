import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailSend } from '../../email/email.send.interface';
import { EmailTransport } from '../../email/email.transport';
import { HtmlRender } from '../../email/html.render';
import { PdfRender } from '../../email/pdf.render';
import { ErrorIf } from '../../lib/error.if';
import {
  PROMOCODE_ALREADY_USED,
  PROMOCODE_NOT_FOUND,
  PROMOCODE_PAYMENT_NOT_FOUND,
} from '../../lib/errors';
import { PaymentStatus } from '../../lib/payment.status';
import { generateSignature } from '../../lib/signature';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { PromocodeActivateRequestDto } from '../dto/promocode.activate.request.dto';
import { PromocodeBuyRequestDto } from '../dto/promocode.buy.request.dto';
import { PromocodeWebhookDto } from '../dto/promocode.webhook.dto';
import { Promocode } from '../entity/promocode.entity';
import { PaymentMethodEnum } from '../payment.method.enum';
import { PromocodeHistoryRepository } from '../repository/promocode.history.repository';
import { PromocodeRepository } from '../repository/promocode.repository';
import * as config from 'config';

const emailTransport = new EmailTransport();

@Injectable()
export class PromocodeService {
  constructor(
    @InjectRepository(PromocodeRepository)
    private promocodeRepository: PromocodeRepository,

    @InjectRepository(PromocodeHistoryRepository)
    private promocodeHistoryRepository: PromocodeHistoryRepository,
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
    if (!user) {
      user = await this.userService.createUserByPhone(
        promocodeActivateRequestDto.phone,
      );
    }

    await this.promocodeHistoryRepository.createPromocodeHistory({
      promocodeId: promocode.id,
      userId: user.id,
    });

    await this.decrementAmount(promocode);
    await this.userService.activatePromocode(user, promocode);
    // что-то поменять с квизами
  }

  async webhook(
    requestId: string,
    promocodeWebhookDto: PromocodeWebhookDto,
  ): Promise<void> {
    if (!promocodeWebhookDto.OrderId) {
      return;
    }
    const promocodeId: number = Number(promocodeWebhookDto.OrderId);
    const promocode: Promocode = await this.promocodeRepository.findOne(
      promocodeId,
    );

    const payload = promocodeWebhookDto;
    const password: string = config.get('terminalPassword');
    const checkToken = generateSignature({
      payload,
      password,
    });

    console.log('1 ' + checkToken); // tslint:disable-line
    console.log('2 ' + promocodeWebhookDto.Token); // tslint:disable-line

    if (checkToken !== promocodeWebhookDto.Token) {
      console.log('Check failed!'); // tslint:disable-line
      return;
    }

    if (promocode && promocodeWebhookDto.Status === PaymentStatus.CONFIRMED) {
      await this.promocodeRepository.confirmPayment(promocode);

      const resetLink = 'test';
      const html: string = await HtmlRender.renderGiftEmail({
        resetLink,
      });

      const pdfHtml: string = await HtmlRender.renderGiftCertificate({
        text: promocode.text,
        months: promocode.months,
      });
      const content: Buffer = await PdfRender.renderPdf(pdfHtml);
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
    function randomInteger(min, max) {
      const rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    function randomString(length) {
      const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length),
        );
      }
      return result;
    }

    if (promocodeBuyRequestDto.isCorporate) {
      promocodeBuyRequestDto.text = promocodeBuyRequestDto.text
        ? promocodeBuyRequestDto.text + randomInteger(1000, 9999).toString()
        : randomString(6);
    } else {
      promocodeBuyRequestDto.text = randomString(6);
    }

    const promocode: Promocode = await this.promocodeRepository.createPromocode(
      promocodeBuyRequestDto,
    );

    if (promocodeBuyRequestDto.method === PaymentMethodEnum.BILL) {
      const emailData: EmailSend = {
        recipientEmails: [config.get('managerEmail')],
        subject: 'Новая заявка на корпоративную подписку',
        payload:
          `Вам заявка на подписку c оплатой по счету на ${promocodeBuyRequestDto.months} месяцев.\n` +
          `От ${promocodeBuyRequestDto.email} ${promocodeBuyRequestDto.phone}.\n` +
          `Желаемый промокод: ${
            promocodeBuyRequestDto.text
              ? promocodeBuyRequestDto.text
              : 'отсутствует'
          }` +
          `\nКоличество подписок: ${promocodeBuyRequestDto.amountTotal}`,
        requestId,
        userId: 0,
      };
      await emailTransport.send(emailData);
    }
    return promocode;
  }

  async generateCertificate(id: number): Promise<Buffer> {
    const promocode: Promocode = await this.promocodeRepository.findOne(id);
    ErrorIf.isEmpty(promocode, PROMOCODE_NOT_FOUND);
    const pdfHtml: string = await HtmlRender.renderGiftCertificate({
      text: promocode.text,
      months: promocode.months,
    });
    ErrorIf.isEmpty(promocode.paymentDate, PROMOCODE_PAYMENT_NOT_FOUND);
    return PdfRender.renderPdf(pdfHtml);
  }

  async decrementAmount(promocode: Promocode) {
    ErrorIf.isTrue(promocode.amountLeft <= 0, PROMOCODE_ALREADY_USED);
    await this.promocodeRepository.decrementAmount(promocode);
  }
}
