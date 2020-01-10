import {
  Controller,
  Get,
  UseGuards,
  Param,
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
import { IdRequestDto } from '../dto/id.request.dto';
import {
  GetFastSupportResponse,
  GetFastSupportResponseDto,
} from '../response/get.fast.support.response';
import { FastSupportService } from '../service/fast.support.service';
import { GetUser } from '../../user/get.user.decorator';
import { User } from '../../user/user.entity';

@Controller('fast_support')
@ApiUseTags('fast_support')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class FastSupportController {
  constructor(private fastSupportService: FastSupportService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetFastSupportResponse })
  @ApiOperation({ title: 'Загрузка быстрой помощи', deprecated: false })
  async getLesson(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
  ): Promise<GetFastSupportResponse> {
    const response: GetFastSupportResponseDto = await this.fastSupportService.getFastSupportById(
      user.id,
      idRequestDto.id,
    );
    return new GetFastSupportResponse(requestId, response);
  }
}
