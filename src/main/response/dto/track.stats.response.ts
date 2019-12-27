import { ApiModelProperty } from '@nestjs/swagger';

export class TrackStatsResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: true,
    isArray: false,
  })
  public readonly lastProgress: number;

  @ApiModelProperty({
    type: 'number',
    nullable: true,
    isArray: false,
  })
  public readonly maxProgress: number;
}
