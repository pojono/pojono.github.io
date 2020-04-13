import { ApiModelProperty } from '@nestjs/swagger';
import { CourseResponseDto } from './course.response';
import { CourseStatsResponseDto } from './course.stats.response';

export class CourseWithStatsResponseDto {
  @ApiModelProperty({ type: CourseResponseDto, nullable: false })
  public readonly courseInfo: CourseResponseDto;

  @ApiModelProperty({ type: CourseStatsResponseDto, nullable: false })
  public readonly courseStats: CourseStatsResponseDto;
}
