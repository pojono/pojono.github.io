import { ApiModelProperty } from '@nestjs/swagger';

export class ChoiceForMultichoiceResponseDto {
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
  public readonly choiceId: number;

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
