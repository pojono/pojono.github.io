import { ApiModelProperty } from '@nestjs/swagger';
import { ActionTypesEnum } from '../../../action.types.enum';
import { ChoiceResponseDto } from './choice.response';
import { MultichoiceResponseDto } from './multichoice.response';
import { RangeResponseDto } from './range.response';
import { InputResponseDto } from './input.response';
import { ActionResponseDto } from './action.response';
import { GoToResponseDto } from './go.to.response';
import { CheckboxResponseDto } from './checkbox.response';
import { TimepickerResponseDto } from './timepicker.response';

export class QuizResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly id: number;

  @ApiModelProperty({
    type: ActionTypesEnum,
    enum: ActionTypesEnum,
    nullable: true,
    isArray: false,
  })
  public readonly type: ActionTypesEnum;

  @ApiModelProperty({
    type: ChoiceResponseDto,
    nullable: true,
    isArray: true,
  })
  public readonly choice: ChoiceResponseDto[];

  @ApiModelProperty({
    type: MultichoiceResponseDto,
    nullable: true,
    isArray: false,
  })
  public readonly multichoice: MultichoiceResponseDto;

  @ApiModelProperty({
    type: RangeResponseDto,
    nullable: true,
    isArray: false,
  })
  public readonly range: RangeResponseDto;

  @ApiModelProperty({
    type: InputResponseDto,
    nullable: true,
    isArray: false,
  })
  public readonly input: InputResponseDto;

  @ApiModelProperty({
    type: ActionResponseDto,
    nullable: true,
    isArray: false,
  })
  public readonly action: ActionResponseDto;

  @ApiModelProperty({
    type: GoToResponseDto,
    nullable: true,
    isArray: false,
  })
  public readonly goto: GoToResponseDto;

  @ApiModelProperty({
    type: CheckboxResponseDto,
    nullable: true,
    isArray: false,
  })
  public readonly checkbox: CheckboxResponseDto;

  @ApiModelProperty({
    type: TimepickerResponseDto,
    nullable: true,
    isArray: false,
  })
  public readonly timepicker: TimepickerResponseDto;
}
