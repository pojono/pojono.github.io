import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

class SingInResponseDto {
  @ApiModelProperty({
    type: 'string',
    description: 'bearer token',
    nullable: false,
  })
  public readonly token: string;
}

export class SignInResponse extends CustomResponse {
  @ApiModelProperty({ type: SingInResponseDto })
  data: SingInResponseDto;

  constructor(data: SingInResponseDto) {
    super(true);
    this.data = data;
  }
}
