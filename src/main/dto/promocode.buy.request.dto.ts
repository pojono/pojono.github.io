import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PaymentMethodEnum } from '../payment.method.enum';

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

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiModelProperty({
    type: 'number',
    example: 52,
    required: true,
  })
  discount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiModelProperty({
    type: 'number',
    example: 52,
    required: true,
  })
  discountCorporation?: number;

  @IsBoolean()
  @ApiModelProperty({
    type: 'boolean',
    example: false,
    required: true,
  })
  isCorporate: boolean;

  @IsString()
  @ApiModelProperty({
    type: PaymentMethodEnum,
    example: PaymentMethodEnum.CARD,
    required: true,
    enum: [PaymentMethodEnum.CARD, PaymentMethodEnum.BILL],
  })
  method: PaymentMethodEnum;

  @IsOptional()
  @IsString()
  @Length(4, 16)
  @ApiModelProperty({
    type: 'string',
    example: 'MYPROMOCODE',
    required: false,
  })
  text?: string;
}
