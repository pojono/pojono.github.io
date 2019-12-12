import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { VideoAdviceResponseDto } from './dto/video.advice.response';
import { LessonResponseDto } from './dto/lesson.response';
import { ChallengeResponseDto } from './dto/challenge.response';
import { CourseWithStatsResponseDto } from './dto/course.with.stats.response';

class GetCourseResponseDto {
  @ApiModelProperty({
    type: CourseWithStatsResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly course: CourseWithStatsResponseDto;

  @ApiModelProperty({
    type: LessonResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly lesson: LessonResponseDto;

  @ApiModelProperty({
    type: ChallengeResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly challenge: ChallengeResponseDto;

  @ApiModelProperty({
    type: VideoAdviceResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly videoAdvice: VideoAdviceResponseDto;
}

export class GetCourseResponse extends CustomResponse {
  @ApiModelProperty({ type: GetCourseResponseDto })
  data: GetCourseResponseDto;

  constructor(data: GetCourseResponseDto) {
    super(true);
    this.data = data;
  }
}