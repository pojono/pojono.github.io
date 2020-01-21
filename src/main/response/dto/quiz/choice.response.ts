import { ApiModelProperty } from '@nestjs/swagger';

export class ChoiceResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly id: number;

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

  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly quizId: number;
}
