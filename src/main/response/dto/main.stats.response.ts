import { ApiModelProperty } from '@nestjs/swagger';

export class MainStatsResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly todayUsers: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly todayUsersTime: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly maxStrike: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly myCurrentStrike: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly myMaxStrike: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly myTodayTime: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly totalListenTime: number;
}
