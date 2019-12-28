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
import { GetFastSupportResponse } from '../response/get.fast.support.response';

@Controller('fast_support')
@ApiUseTags('fast_support')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class FastSupportController {
  constructor(/*private lessonService: LessonService*/) {
    // TODO: add fast support
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetFastSupportResponse })
  @ApiOperation({ title: 'Загрузка быстрой помощи', deprecated: true })
  async getLesson(
    @GetRequestId() requestId,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
  ): Promise<GetFastSupportResponse> {
    return new GetFastSupportResponse(requestId, null);
  }
}
