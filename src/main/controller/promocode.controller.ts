import {
  Body,
  Controller,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
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

@Controller('promocodes')
@ApiUseTags('promocodes')
export class PromocodeController {
  constructor(private promocodeService: PromocodeService) {}

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
