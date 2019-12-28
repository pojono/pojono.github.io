import { ApiModelProperty } from '@nestjs/swagger';
import { TrackStatsResponseDto } from './track.stats.response';
import { FastSupportResponseDto } from './fast.support.response';

export class FastSupportWithStatsResponseDto {
  @ApiModelProperty({
    type: FastSupportResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly fastSupportInfo: FastSupportResponseDto;

  @ApiModelProperty({
    type: TrackStatsResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly trackStats: TrackStatsResponseDto;
}
