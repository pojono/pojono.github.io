import { ApiModelProperty } from '@nestjs/swagger';
import { EntityEnum } from '../../../enitity.enum';

export class MessageResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly id: number;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    isArray: false,
  })
  public readonly text: string;

  @ApiModelProperty({
    type: EntityEnum,
    enum: EntityEnum,
    nullable: true,
    isArray: false,
  })
  public readonly entity: EntityEnum;

  @ApiModelProperty({
    type: 'number',
    nullable: true,
    isArray: false,
  })
  public readonly entityId: number;

  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly quizId: number;

  @ApiModelProperty({
    type: 'number',
    nullable: false,
    description: 'Порядковый номер сообщения',
    default: 0,
  })
  public readonly orderIndex: number;
}
