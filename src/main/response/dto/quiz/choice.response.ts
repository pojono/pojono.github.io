import { ApiModelProperty } from '@nestjs/swagger';

export class ChoiceResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly answerId: number;

  @ApiModelProperty({
    type: 'string',
    nullable: false,
    isArray: false,
  })
  public readonly text: string;
}
