import { ApiModelProperty } from '@nestjs/swagger';
import { ActionNamesEnum } from '../../../action.names.enum';

export class ActionResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly answerId: number;

  @ApiModelProperty({
    type: ActionNamesEnum,
    enum: ActionNamesEnum,
    nullable: false,
    isArray: false,
  })
  public readonly name: ActionNamesEnum;
}
