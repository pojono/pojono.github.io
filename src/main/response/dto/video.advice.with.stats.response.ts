import { ApiModelProperty } from '@nestjs/swagger';
import { VideoAdviceResponseDto } from './video.advice.response';
import { VideoAdviceStatsResponseDto } from './video.advice.stats.response';

export class VideoAdviceWithStatsResponseDto {
  @ApiModelProperty({
    type: VideoAdviceResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly videoAdviceInfo: VideoAdviceResponseDto;

  @ApiModelProperty({
    type: VideoAdviceStatsResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly videoAdviceStats: VideoAdviceStatsResponseDto;
}
