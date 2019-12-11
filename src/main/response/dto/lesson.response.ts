import { ApiModelProperty } from '@nestjs/swagger';

export class LessonResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly id: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly courseId: number;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly name: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly description: string;

  @ApiModelProperty({ type: 'boolean', nullable: false })
  public readonly isLatest: boolean;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly colour: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly affirmation: string;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly orderIndex: number;
}
