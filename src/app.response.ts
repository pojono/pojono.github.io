import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from './lib/custom.response';

class RootResponseDto {
  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly uptime: string;
}

export class RootResponse extends CustomResponse {
  @ApiModelProperty({ type: RootResponseDto })
  data: RootResponseDto;

  constructor(data: RootResponseDto) {
    super(true);
    this.data = data;
  }
}
