import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

export class GetEventResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: true,
    isArray: false,
  })
  public readonly quizId: number | null;
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
