import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserPromocodeDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @ApiModelProperty({
    type: 'string',
    example: 'AVOCADO',
    required: true,
  })
  promocode: string;
}
