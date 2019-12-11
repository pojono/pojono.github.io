import { ApiModelProperty } from '@nestjs/swagger';

export class RubricResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly id: number;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly name: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly description: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly picture: string;

  @ApiModelProperty({ type: 'boolean', nullable: false })
  public readonly isSleep: boolean;
}
