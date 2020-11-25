import { ApiModelProperty } from '@nestjs/swagger';

export class MainStatsPublicResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly todayUsers: number;
}
