import {
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
  Max,
  IsNumberString,
  Length,
} from 'class-validator';
import * as config from 'config';
import { ApiModelProperty } from '@nestjs/swagger';

export class SignInRequestDto {
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @ApiModelProperty({
    type: 'string',
    example: '12345678',
    required: true,
  })
  phone: string;

  @IsNumberString()
  @Length(4, 4)
  @ApiModelProperty({
    type: 'string',
    example: config.get('sms.notRandom'),
    required: true,
  })
  code: string;
}
