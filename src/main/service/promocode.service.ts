import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailSend } from '../../email/email.send.interface';
import { EmailTransport } from '../../email/email.transport';
import { HtmlRender } from '../../email/html.render';
import { PdfRender } from '../../email/pdf.render';
import { ErrorIf } from '../../lib/error.if';
import { PROMOCODE_ALREADY_USED, PROMOCODE_NOT_FOUND } from '../../lib/errors';
import { User } from '../../user/user.entity';
import { PromocodeActivateRequestDto } from '../dto/promocode.activate.request.dto';
import { PromocodeBuyRequestDto } from '../dto/promocode.buy.request.dto';
import { Promocode } from '../entity/promocode.entity';
import { PromocodeHistoryRepository } from '../repository/promocode.history.repository';
import { PromocodeRepository } from '../repository/promocode.repository';
import { UserService } from '../../user/user.service';

const emailTransport = new EmailTransport();

@Injectable()
export class PromocodeService {
  constructor(
    @InjectRepository(PromocodeRepository)
    private promocodeRepository: PromocodeRepository,
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

  async buyPromocode(
    promocodeBuyRequestDto: PromocodeBuyRequestDto,
    requestId: string,
  ): Promise<Promocode> {
    const promocode: Promocode = await this.promocodeRepository.createPromocode(
      promocodeBuyRequestDto,
    );

    const resetLink = 'test';
    const html: string = await HtmlRender.renderGiftEmail({
      resetLink,
    });

    const pdfHtml: string = await HtmlRender.renderGiftCertificate({
      resetLink,
    });
    const content: Buffer = await PdfRender.renderPdf(pdfHtml);

    const emailData: EmailSend = {
      recipientEmails: [promocodeBuyRequestDto.email],
      subject: 'Поздравляю!',
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

    return promocode;
  }

  async generateCertificate(): Promise<Buffer> {
    const pdfHtml: string = await HtmlRender.renderGiftCertificate({
      resetLink: '',
    });
    return PdfRender.renderPdf(pdfHtml);
  }

  async decrementAmount(promocode: Promocode) {
    ErrorIf.isTrue(promocode.amountLeft <= 0, PROMOCODE_ALREADY_USED);
    await this.promocodeRepository.decrementAmount(promocode);
  }
}
