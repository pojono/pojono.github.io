import { ApiModelProperty } from '@nestjs/swagger';

export class VideoAdviceResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly id: number;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly name: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly url: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly duration: string;

  @ApiModelProperty({ type: 'boolean', nullable: false })
  public readonly forMainPage: boolean;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly colour: string;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly orderIndex: number;
}
