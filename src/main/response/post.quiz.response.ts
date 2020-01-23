import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

export class PostQuizResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: true,
    isArray: false,
  })
  public readonly quizId: number | null;
}

export class PostQuizResponse extends CustomResponse {
  @ApiModelProperty({
    type: PostQuizResponseDto,
    isArray: false,
    nullable: false,
  })
  data: PostQuizResponseDto;

  constructor(requestId: string, data: PostQuizResponseDto) {
    super(requestId);
    this.data = data;
  }
}
