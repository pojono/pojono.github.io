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
import {
  GetLessonResponse,
  GetLessonResponseDto,
} from '../response/get.lesson.response';
import { GetRequestId } from '../../lib/get.request.id.decorator';
import { LessonService } from '../service/lesson.service';
import { IdRequestDto } from '../dto/id.request.dto';
import { GetUser } from '../../user/get.user.decorator';
import { User } from '../../user/user.entity';

@Controller('lessons')
@ApiUseTags('lessons')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetLessonResponse })
  @ApiOperation({ title: 'Загрузка экрана занятия', deprecated: false })
  async getLesson(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
  ): Promise<GetLessonResponse> {
    const lessonWithTracks: GetLessonResponseDto = await this.lessonService.getLessonById(
      user.id,
      idRequestDto.id,
    );

    return new GetLessonResponse(requestId, lessonWithTracks);
  }
}
