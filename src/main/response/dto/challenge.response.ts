import { ApiModelProperty } from '@nestjs/swagger';

export class ChallengeResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly id: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly courseId: number;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly name: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly description: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly picture: string;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly showAfterLessonIndex: number;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly colour: string;
}
