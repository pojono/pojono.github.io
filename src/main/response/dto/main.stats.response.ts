import { ApiModelProperty } from '@nestjs/swagger';

export class MainStatsResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly todayUsers: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly todayUsersTime: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly maxStrike: number;
}
