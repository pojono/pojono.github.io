import {
  IsString,
  MaxLength,
  MinLength,
  Length,
  IsEmail,
  Max,
  Min,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PromocodeBuyRequestDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiModelProperty({
    type: 'string',
    example: '12345678',
    required: true,
  })
  phone?: string;

  @IsEmail()
  @ApiModelProperty({
    type: 'string',
    example: 'test@test.com',
    required: true,
  })
  email: string;

  @IsNumber()
  @Min(1)
  @Max(36)
  @ApiModelProperty({
    type: 'number',
    example: 12,
    required: true,
  })
  months: number;

  @IsNumber()
  @Min(1)
  @Max(99999)
  @ApiModelProperty({
    type: 'number',
    example: 10,
    required: true,
  })
  amountTotal: number;

  @IsNumber()
  @Min(1)
  @Max(99999999999)
  @ApiModelProperty({
    type: 'number',
    example: 1000,
    required: true,
  })
  price: number;

  @IsBoolean()
  @ApiModelProperty({
    type: 'boolean',
    example: false,
    required: true,
  })
  isCorporate: boolean;

  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: 'card',
    required: true,
  })
  method: string;

  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: 'mypromo',
    required: false,
  })
  text?: string;
}
