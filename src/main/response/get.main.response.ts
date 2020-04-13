import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { FastSupportResponseDto } from './dto/fast.support.response';
import { MainStatsResponseDto } from './dto/main.stats.response';
import { VideoAdviceResponseDto } from './dto/video.advice.response';
import { CourseWithStatsResponseDto } from './dto/course.with.stats.response';
import { FastSupportWithStatsResponseDto } from './dto/fast.support.with.stats.response';

export class GetMainResponseDto {
  @ApiModelProperty({
    type: CourseWithStatsResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly topCourse: CourseWithStatsResponseDto;

  @ApiModelProperty({
    type: MainStatsResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly stats: MainStatsResponseDto;

  @ApiModelProperty({
    type: CourseWithStatsResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly bestCourses: CourseWithStatsResponseDto[];

  @ApiModelProperty({
    type: CourseWithStatsResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly announcement: CourseWithStatsResponseDto[];

  @ApiModelProperty({
    type: FastSupportResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly fastSupport: FastSupportResponseDto[];

  @ApiModelProperty({
    type: VideoAdviceResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly videoAdvice: VideoAdviceResponseDto[];
}

export class GetMainResponse extends CustomResponse {
  @ApiModelProperty({
    type: GetMainResponseDto,
    isArray: false,
    nullable: false,
  })
  data: GetMainResponseDto;

  constructor(requestId: string, data: any /*GetMainResponseDto*/) {
    super(requestId);
    this.data = data;
  }
}
