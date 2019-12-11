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

@Controller('lesson')
@ApiUseTags('lesson')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class LessonController {
  private logger = new Logger();

  constructor(private mainService: MainService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetLessonResponse })
  @ApiOperation({ title: 'Загрузка экрана занятия' })
  async main(): Promise<GetLessonResponse> {
    return new GetLessonResponse(null);
  }
}
