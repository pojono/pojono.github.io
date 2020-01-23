import {
  Controller,
  Get,
  Param,
  UseGuards,
  ValidationPipe,
  Post,
  Body,
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
import { GetQuizResponse } from '../response/get.quiz.response';
import { QuizService } from '../service/quiz.service';
import { IdRequestDto } from '../dto/id.request.dto';
import { PostQuizResponse } from '../response/post.quiz.response';
import { QuizAnswerDto } from '../dto/quiz.answer.dto';

@Controller('quizzes')
@ApiUseTags('quizzes')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: GetQuizResponse })
  @ApiOperation({
    title: 'Получение сообщения в мессенджере',
    deprecated: false,
  })
  async getQuiz(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
  ): Promise<GetQuizResponse> {
    return new GetQuizResponse(
      requestId,
      await this.quizService.getQuiz(idRequestDto.id),
    );
  }

  @Post('/:id')
  @ApiResponse({ status: 200, type: PostQuizResponse })
  @ApiOperation({
    title: 'Ответ на квиз',
    deprecated: false,
  })
  async postQuiz(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
    @Body(ValidationPipe) quizAnswerDto: QuizAnswerDto,
  ): Promise<PostQuizResponse> {
    return new PostQuizResponse(
      requestId,
      await this.quizService.postQuiz(user, quizAnswerDto),
    );
  }
}
