import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

export class PromocodeResponseDto {
  @ApiModelProperty({
    type: 'number',
    isArray: false,
  })
  public readonly id: number;

  @ApiModelProperty({
    type: 'string',
    isArray: false,
  })
  public readonly text: string;

  @ApiModelProperty({
    type: 'number',
    isArray: false,
  })
  public readonly amountTotal: number;

  @ApiModelProperty({
    type: 'number',
    isArray: false,
  })
  public readonly amountLeft: number;

  @ApiModelProperty({
    type: 'number',
    isArray: false,
  })
  public readonly months: number;

  @ApiModelProperty({
    type: 'number',
    isArray: false,
  })
  public readonly price: number;

  @ApiModelProperty({
    type: 'string',
    isArray: false,
  })
  public readonly phone: string;

  @ApiModelProperty({
    type: 'string',
    isArray: false,
  })
  public readonly email: string;

  @ApiModelProperty({
    type: 'string',
    isArray: false,
  })
  public readonly method: string;

  @ApiModelProperty({
    type: 'boolean',
    isArray: false,
  })
  public readonly isCorporate: boolean;

  @ApiModelProperty({ type: 'string', nullable: false, format: 'date-time' })
  public readonly creationDate: Date;

  @ApiModelProperty({ type: 'string', nullable: true, format: 'date-time' })
  public readonly paymentDate: Date;
}

export class PostPromocodeBuyResponse extends CustomResponse {
  @ApiModelProperty({
    type: PromocodeResponseDto,
    isArray: false,
    nullable: false,
  })
  data: PromocodeResponseDto;

  constructor(requestId: string, data: PromocodeResponseDto) {
    super(requestId);
    this.data = data;
  }
}
