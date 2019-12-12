import { ApiModelProperty } from '@nestjs/swagger';

export class VideoAdviceStatsResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly showAfterLessonIndex: number;
}
