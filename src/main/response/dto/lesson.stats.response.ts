import { ApiModelProperty } from '@nestjs/swagger';

export class LessonStatsResponseDto {
  @ApiModelProperty({ type: 'number', nullable: true })
  public readonly lastTrackId: number;
}
