import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { User } from '../user.entity';

class MeResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly id: number;

  @ApiModelProperty({ type: 'string', nullable: false })
  public readonly phone: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly firstName: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly lastName: string;
}

export class MeResponse extends CustomResponse {
  @ApiModelProperty({ type: MeResponseDto })
  data: MeResponseDto;

  constructor(requestId: string, data: User) {
    super(requestId);
    this.data = data;
  }
}
