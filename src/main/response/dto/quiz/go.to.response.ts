import { ApiModelProperty } from '@nestjs/swagger';
import { EntityEnum } from '../../../enitity.enum';

export class GoToResponseDto {
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
}
