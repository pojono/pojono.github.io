import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { MessageResponseDto } from './dto/quiz/message.response';
import { QuizResponseDto } from './dto/quiz/quiz.response';

export class GetQuizResponseDto {
  @ApiModelProperty({
    type: MessageResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly messages: MessageResponseDto[];

  @ApiModelProperty({
    type: QuizResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly quiz: QuizResponseDto;
}

export class GetQuizResponse extends CustomResponse {
  @ApiModelProperty({
    type: GetQuizResponseDto,
    isArray: false,
    nullable: false,
  })
  data: GetQuizResponseDto;

  constructor(requestId: string, data: GetQuizResponseDto) {
    super(requestId);
    this.data = data;
  }
}
