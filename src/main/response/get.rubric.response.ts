import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { RubricResponseDto } from './dto/rubric.response';

export class GetRubricResponse extends CustomResponse {
  @ApiModelProperty({ type: RubricResponseDto, isArray: true })
  data: RubricResponseDto;

  constructor(data: RubricResponseDto) {
    super(true);
    this.data = data;
  }
}
