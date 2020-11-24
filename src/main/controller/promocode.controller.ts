import {
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
import { PostPromocodeActivateResponse } from '../response/post.promocode.activate.response';
import { PromocodeService } from '../service/promocode.service';

@Controller('promocodes')
@ApiUseTags('promocodes')
@UseGuards(AuthGuard())
@ApiBearerAuth()
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
    @GetUser() user: User,
    @Query(ValidationPipe)
    promocodeActivateRequestDto: PromocodeActivateRequestDto,
  ): Promise<PostPromocodeActivateResponse> {
    await this.promocodeService.activatePromocode(promocodeActivateRequestDto);
    return new PostPromocodeActivateResponse(requestId, null);
  }
}
