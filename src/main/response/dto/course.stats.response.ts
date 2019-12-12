import { ApiModelProperty } from '@nestjs/swagger';

export class CourseStatsResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly numberOfLessons: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly finishedLessons: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly numberOfStudents: number;
}
