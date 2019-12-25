import { ApiModelProperty } from '@nestjs/swagger';

export class CourseResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly id: number;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly name: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly description: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly picture: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly durationOfLessons: string;

  @ApiModelProperty({ type: 'string', nullable: true, format: 'date-time' })
  public readonly startDate: Date;

  @ApiModelProperty({ type: 'boolean', nullable: false })
  public readonly theBestForYou: boolean;

  @ApiModelProperty({ type: 'boolean', nullable: false })
  public readonly forAnnounce: boolean;

  @ApiModelProperty({ type: 'boolean', nullable: false })
  public readonly beginnerCourse: boolean;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly colour: string;
}
