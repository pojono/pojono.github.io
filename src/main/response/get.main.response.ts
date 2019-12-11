import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { FastSupportResponseDto } from './dto/fast.support.response';
import { CourseResponseDto } from './dto/course.response';
import { MainStatsResponseDto } from './dto/main.stats.response';
import { VideoAdviceResponseDto } from './dto/video.advice.response';

class GetMainResponseDto {
  @ApiModelProperty({
    type: CourseResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly topCourse: CourseResponseDto;

  @ApiModelProperty({
    type: MainStatsResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly stats: MainStatsResponseDto;

  @ApiModelProperty({
    type: CourseResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly bestCourses: CourseResponseDto;

  @ApiModelProperty({
    type: CourseResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly announcement: CourseResponseDto;

  @ApiModelProperty({
    type: FastSupportResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly fastSupport: FastSupportResponseDto;

  @ApiModelProperty({
    type: VideoAdviceResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly videoAdvice: VideoAdviceResponseDto;
}

export class GetMainResponse extends CustomResponse {
  @ApiModelProperty({ type: GetMainResponseDto })
  data: GetMainResponseDto;

  constructor(data: GetMainResponseDto) {
    super(true);
    this.data = data;
  }
}
