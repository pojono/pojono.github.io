import { ApiModelProperty } from '@nestjs/swagger';

export class RangeResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly answerId: number;

  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly from: number;

  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly to: number;

  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly step: number;
}
