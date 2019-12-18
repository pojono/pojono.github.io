import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { RubricResponseDto } from './dto/rubric.response';

export class GetRubricResponse extends CustomResponse {
  @ApiModelProperty({
    type: RubricResponseDto,
    isArray: true,
    nullable: false,
  })
  data: RubricResponseDto[];

  constructor(requestId: string, data: RubricResponseDto[]) {
    super(requestId);
    this.data = data;
  }
}
