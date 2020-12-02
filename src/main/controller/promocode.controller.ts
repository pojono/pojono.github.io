import {
  Body,
  Controller,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiImplicitFile,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetRequestId } from '../../lib/get.request.id.decorator';
import { GetUser } from '../../user/get.user.decorator';
import { User } from '../../user/user.entity';
import { PromocodeActivateRequestDto } from '../dto/promocode.activate.request.dto';
import { PromocodeBuyRequestDto } from '../dto/promocode.buy.request.dto';
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
  ): Promise<void> {
    const fs = require('fs').promises;
    const path = require('path');
    const filepath: string = path.join(
      __dirname,
      '../../email/template/gift.certificate.ejs',
    );
    await fs.writeFile(filepath, file.buffer);
    const data: Buffer = await this.promocodeService.generateCertificate();
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
}
