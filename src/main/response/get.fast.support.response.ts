import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { TrackWithStatsResponseDto } from './dto/track.with.stats.response';
import { FastSupportResponseDto } from './dto/fast.support.response';

export class GetFastSupportResponseDto {
  @ApiModelProperty({
    type: FastSupportResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly fastSupport: FastSupportResponseDto;

  @ApiModelProperty({
    type: TrackWithStatsResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly track: TrackWithStatsResponseDto;
}

export class GetFastSupportResponse extends CustomResponse {
  @ApiModelProperty({
    type: GetFastSupportResponseDto,
    isArray: false,
    nullable: false,
  })
  data: GetFastSupportResponseDto;

  constructor(requestId: string, data: GetFastSupportResponseDto) {
    super(requestId);
    this.data = data;
  }
}
