import { IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class IdRequestDto {
  //@IsNumberString()
  @ApiModelProperty({
    type: 'number',
    example: 1,
    required: true,
  })
  id: number;
}
