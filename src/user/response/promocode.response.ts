import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

class PromocodeResponseDto {
  @ApiModelProperty({ type: 'boolean', nullable: false })
  public readonly isCorrect: boolean;
}

export class PromocodeResponse extends CustomResponse {
  @ApiModelProperty({ type: PromocodeResponseDto })
  data: PromocodeResponseDto;

  constructor(requestId: string, data: PromocodeResponseDto) {
    super(requestId);
    this.data = data;
  }
}
