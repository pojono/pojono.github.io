import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

export class GetEventResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly quizId: number;
}

export class GetEventResponse extends CustomResponse {
  @ApiModelProperty({
    type: GetEventResponseDto,
    isArray: false,
    nullable: false,
  })
  data: GetEventResponseDto;

  constructor(requestId: string, data: GetEventResponseDto) {
    super(requestId);
    this.data = data;
  }
}
