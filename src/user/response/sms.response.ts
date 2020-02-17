import CustomResponse from '../../lib/custom.response';
import { ApiModelProperty } from '@nestjs/swagger';

class SmsResponseDto {
  @ApiModelProperty({
    type: 'boolean',
    description: 'New user or not',
    nullable: false,
  })
  public readonly newUser: boolean;
}

export class SmsResponse extends CustomResponse {
  @ApiModelProperty({ type: SmsResponseDto, nullable: true })
  data: SmsResponseDto;

  constructor(requestId: string, data: SmsResponseDto) {
    super(requestId);
    this.data = data;
  }
}
