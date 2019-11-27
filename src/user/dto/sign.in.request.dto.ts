import {
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
  Max,
  IsNumberString,
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

  @IsNumber()
  @Min(config.get('sms.minCode'))
  @Max(config.get('sms.maxCode'))
  @ApiModelProperty({
    type: 'number',
    example: config.get('sms.notRandom'),
    required: true,
    minimum: config.get('sms.minCode'),
    maximum: config.get('sms.maxCode'),
  })
  code: number;
}
