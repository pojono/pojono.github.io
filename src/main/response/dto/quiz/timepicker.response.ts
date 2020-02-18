import { ApiModelProperty } from '@nestjs/swagger';

export class TimepickerResponseDto {
  @ApiModelProperty({
    type: 'string',
    nullable: true,
    isArray: false,
  })
  public readonly timepickerTitle: string;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    isArray: false,
  })
  public readonly timepickerActiveButton: string;

  @ApiModelProperty({
    type: 'number',
    nullable: true,
    isArray: false,
  })
  public readonly timepickerActiveButtonAnswerId: number;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    isArray: false,
  })
  public readonly timepickerInactiveButton: string;

  @ApiModelProperty({
    type: 'number',
    nullable: true,
    isArray: false,
  })
  public readonly timepickerInactiveButtonAnswerId: number;
}
