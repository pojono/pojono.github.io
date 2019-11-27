import CustomResponse from '../../lib/custom.response';
import { ApiModelProperty } from '@nestjs/swagger';

class SmsResponseDto {}

export class SmsResponse extends CustomResponse {
  @ApiModelProperty({ type: SmsResponseDto, nullable: true })
  data: SmsResponseDto;

  constructor(data: SmsResponseDto) {
    super(true);
    this.data = data;
  }
}
