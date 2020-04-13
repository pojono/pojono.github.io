import { ApiModelProperty } from '@nestjs/swagger';
import { TrackResponseDto } from './track.response';
import { TrackStatsResponseDto } from './track.stats.response';

export class TrackWithStatsResponseDto {
  @ApiModelProperty({
    type: TrackResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly trackInfo: TrackResponseDto;

  @ApiModelProperty({
    type: TrackStatsResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly trackStats: TrackStatsResponseDto;
}
