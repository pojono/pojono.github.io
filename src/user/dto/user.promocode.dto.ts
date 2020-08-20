import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserPromocodeDto {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @ApiModelProperty({
    type: 'string',
    example: 'AVOCADO',
    required: true,
  })
  promocode: string;
}
