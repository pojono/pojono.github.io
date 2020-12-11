import { IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PromocodeTextDto {
  @IsString()
  @Length(4, 20)
  @ApiModelProperty({
    type: 'string',
    example: 'BLACKFRIDAY',
    required: true,
  })
  text: string;
}
