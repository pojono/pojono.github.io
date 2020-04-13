import { ApiModelProperty } from '@nestjs/swagger';

export class VideoAdviceStatsResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: true,
    isArray: false,
  })
  public readonly showAfterLessonIndex: number;
}
