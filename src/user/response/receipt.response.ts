import CustomResponse from '../../lib/custom.response';
import { ApiModelProperty } from '@nestjs/swagger';

class ReceiptResponseDto {}

export class ReceiptResponse extends CustomResponse {
  @ApiModelProperty({ type: ReceiptResponseDto, nullable: true })
  data: ReceiptResponseDto;

  constructor(requestId: string, data: ReceiptResponseDto) {
    super(requestId);
    this.data = data;
  }
}
