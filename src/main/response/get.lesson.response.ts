import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { LessonResponseDto } from './dto/lesson.response';
import { TrackWithStatsResponseDto } from './dto/track.with.stats.response';

export class GetLessonResponseDto {
  @ApiModelProperty({
    type: LessonResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly lesson: LessonResponseDto;

  @ApiModelProperty({
    type: TrackWithStatsResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly track: TrackWithStatsResponseDto[];
}

export class GetLessonResponse extends CustomResponse {
  @ApiModelProperty({
    type: GetLessonResponseDto,
    isArray: false,
    nullable: false,
  })
  data: GetLessonResponseDto;

  constructor(requestId: string, data: GetLessonResponseDto) {
    super(requestId);
    this.data = data;
  }
}
