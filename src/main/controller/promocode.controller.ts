import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiConsumes,
  ApiImplicitFile,
} from '@nestjs/swagger';
import { GetRequestId } from '../../lib/get.request.id.decorator';
import { GetUser } from '../../user/get.user.decorator';
import { User } from '../../user/user.entity';
import { IdRequestDto } from '../dto/id.request.dto';
import { PromocodeActivateRequestDto } from '../dto/promocode.activate.request.dto';
import { PromocodeBuyRequestDto } from '../dto/promocode.buy.request.dto';
import { PromocodeTextDto } from '../dto/promocode.text.dto';
import { PromocodeWebhookDto } from '../dto/promocode.webhook.dto';
import { Promocode } from '../entity/promocode.entity';
import { PostPromocodeActivateResponse } from '../response/post.promocode.activate.response';
import { PostPromocodeBuyResponse } from '../response/post.promocode.buy.response';
import { PromocodeService } from '../service/promocode.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('promocodes')
@ApiUseTags('promocodes')
export class PromocodeController {
  constructor(private promocodeService: PromocodeService) {}

  @Post('/')
  @ApiOperation({ title: 'Upload template certificate' })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'file',
    required: true,
    description: 'Upload certificate template',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @GetUser() user: User,
    @UploadedFile() file,
    @Res() res: Response,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
  ): Promise<void> {
    const fs = require('fs').promises;
    const path = require('path');
    const filepath: string = path.join(
      __dirname,
      '../../email/template/gift.certificate.ejs',
    );
    await fs.writeFile(filepath, file.buffer);
    const data: Buffer = await this.promocodeService.generateCertificate(
      idRequestDto.id,
    );
    res.attachment('certificate.pdf');
    res.send(data);
  }

  @Post('activate')
  @ApiResponse({ status: 200, type: PostPromocodeActivateResponse })
  @ApiOperation({
    title: 'Активация промокода',
    deprecated: false,
  })
  async activatePromocode(
    @GetRequestId() requestId,
    @Body(ValidationPipe)
    promocodeActivateRequestDto: PromocodeActivateRequestDto,
  ): Promise<PostPromocodeActivateResponse> {
    await this.promocodeService.activatePromocode(promocodeActivateRequestDto);
    return new PostPromocodeActivateResponse(requestId, null);
  }

  @Post('webhook')
  @ApiResponse({ status: 200 })
  @ApiOperation({
    title: 'Вебхук',
    deprecated: false,
  })
  async webhook(
    @GetRequestId() requestId,
    @Body(ValidationPipe)
    promocodeWebhookDto: PromocodeWebhookDto,
    @Res() res: Response,
  ): Promise<any> {
    await this.promocodeService.webhook(requestId, promocodeWebhookDto);
    res.status(200).send('OK');
  }

  @Post('check')
  @ApiResponse({ status: 200 })
  @ApiOperation({
    title: 'Вебхук',
    deprecated: false,
  })
  async webhookCheck(
    @GetRequestId() requestId,
    // @Body(ValidationPipe)
    // promocodeWebhookDto: PromocodeWebhookDto,
    @Res() res: Response,
  ): Promise<any> {
    // const response: any = await this.promocodeService.webhook(
    //   promocodeWebhookDto,
    // );
    res.status(200).send('OK');
  }

  @Post('buy')
  @ApiResponse({ status: 200, type: PostPromocodeBuyResponse })
  @ApiOperation({
    title: 'Покупка подписки',
    deprecated: false,
  })
  async buyPromocode(
    @GetRequestId() requestId,
    @Body(ValidationPipe) promocodeBuyRequestDto: PromocodeBuyRequestDto,
  ): Promise<PostPromocodeBuyResponse> {
    const promocode: Promocode = await this.promocodeService.buyPromocode(
      promocodeBuyRequestDto,
      requestId,
    );
    return new PostPromocodeBuyResponse(requestId, promocode);
  }

  @Get('/:id/certificate')
  @ApiOperation({ title: 'Скачать сертификат', deprecated: false })
  async getLesson(
    @GetRequestId() requestId,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
    @Res() res: Response,
    @Query(ValidationPipe) promocodeTextDto: PromocodeTextDto,
  ): Promise<void> {
    const data: Buffer = await this.promocodeService.generateCertificate(
      idRequestDto.id,
    );
    res.attachment('certificate.pdf');
    res.send(data);
  }

  /*
  @Get('/:id/certificate-download')
  @ApiOperation({
    title: 'Скачать сертификат другим методом',
    deprecated: false,
  })
  async getCertificate(
    @GetRequestId() requestId,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
    @Res() res: Response,
    @Query(ValidationPipe) promocodeTextDto: PromocodeTextDto,
  ): Promise<void> {
    const data: Buffer = await this.promocodeService.generateCertificate(
      idRequestDto.id,
    );
    res.status(200);
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/pdf',
      'Content-Length': data.length,
      'Content-Disposition': 'attachment; filename=certificate.pdf',
    });
    res.send(data);
  }
  */
}
