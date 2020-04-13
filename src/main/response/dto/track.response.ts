import { ApiModelProperty } from '@nestjs/swagger';

export class TrackResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly id: number;

  @ApiModelProperty({ type: 'number', nullable: true })
  public readonly duration: number;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly url: string;
}
