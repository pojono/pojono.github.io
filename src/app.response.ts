import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from './lib/custom.response';

class RootResponseDto {
  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly uptime: string;
}

export class RootResponse extends CustomResponse {
  @ApiModelProperty({ type: RootResponseDto })
  data: RootResponseDto;

  constructor(requestId: string, data: RootResponseDto) {
    super(requestId);
    this.data = data;
  }
}
