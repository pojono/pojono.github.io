import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { LessonResponseDto } from './dto/lesson.response';
import { ChallengeResponseDto } from './dto/challenge.response';
import { CourseWithStatsResponseDto } from './dto/course.with.stats.response';
import { VideoAdviceWithStatsResponseDto } from './dto/video.advice.with.stats.response';

export class GetCourseByIdResponseDto {
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
  public readonly lesson: LessonResponseDto[];

  @ApiModelProperty({
    type: ChallengeResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly challenge: ChallengeResponseDto;

  @ApiModelProperty({
    type: VideoAdviceWithStatsResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly videoAdvice: VideoAdviceWithStatsResponseDto[];
}

export class GetCourseByIdResponse extends CustomResponse {
  @ApiModelProperty({
    type: GetCourseByIdResponseDto,
    nullable: false,
    isArray: false,
  })
  data: GetCourseByIdResponseDto;

  constructor(requestId: string, data: GetCourseByIdResponseDto) {
    super(requestId);
    this.data = data;
  }
}