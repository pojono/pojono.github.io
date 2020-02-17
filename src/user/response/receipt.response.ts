import CustomResponse from '../../lib/custom.response';
import { ApiModelProperty } from '@nestjs/swagger';

export class ReceiptResponseDto {
  @ApiModelProperty({
    type: 'boolean',
    description: 'Result of validation',
    nullable: false,
  })
  public readonly subscriptionIsActive: boolean;
}

export class ReceiptResponse extends CustomResponse {
  @ApiModelProperty({ type: ReceiptResponseDto, nullable: true })
  data: ReceiptResponseDto;

  constructor(requestId: string, data: ReceiptResponseDto) {
    super(requestId);
    this.data = data;
  }
}
