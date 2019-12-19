import { Controller, Logger, Get, UseGuards } from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MainService } from '../main.service';
import { AuthGuard } from '@nestjs/passport';
import { GetLessonResponse } from '../response/get.lesson.response';
import { GetRequestId } from '../../lib/get.request.id.decorator';

@Controller('lessons')
@ApiUseTags('lessons')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class LessonController {
  constructor(private mainService: MainService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetLessonResponse })
  @ApiOperation({ title: 'Загрузка экрана занятия', deprecated: true })
  async main(@GetRequestId() requestId): Promise<GetLessonResponse> {
    return new GetLessonResponse(requestId, null);
  }
}
