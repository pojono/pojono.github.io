import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { CourseResponseDto } from './dto/course.response';
import { VideoAdviceResponseDto } from './dto/video.advice.response';
import { LessonResponseDto } from './dto/lesson.response';
import { ChallengeResponseDto } from './dto/challenge.response';

class GetCourseResponseDto {
  @ApiModelProperty({
    type: CourseResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly course: CourseResponseDto;

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
