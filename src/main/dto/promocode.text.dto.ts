import { IsNumberString, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PromocodeTextDto {
  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: 'BLACKFRIDAY',
    required: true,
  })
  text: string;
}
