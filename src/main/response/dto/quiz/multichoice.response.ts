import { ApiModelProperty } from '@nestjs/swagger';
import { ChoiceForMultichoiceResponseDto } from './choice.for.multichoice.response';

export class MultichoiceResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly answerId: number;

  @ApiModelProperty({
    type: ChoiceForMultichoiceResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly choices: ChoiceForMultichoiceResponseDto[];
}
