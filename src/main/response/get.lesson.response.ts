import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { LessonResponseDto } from './dto/lesson.response';
import { TrackResponseDto } from './dto/track.response';

export class GetLessonResponseDto {
  @ApiModelProperty({
    type: LessonResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly lesson: LessonResponseDto;

  @ApiModelProperty({
    type: TrackResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly track: TrackResponseDto[];
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
