import { IsNumberString, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PromocodeTextDto {
  @IsString()
  @ApiModelProperty({
    type: 'number',
    example: 1,
    required: true,
  })
  text: string;
}
