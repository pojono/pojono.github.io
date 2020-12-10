import {
  IsString,
  MaxLength,
  MinLength,
  Length,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../lib/payment.status';

export class PromocodeWebhookDto {
  // @IsString()
  @ApiModelProperty({
    type: 'string',
    example: '',
    required: true,
    description:
      'Идентификатор терминала. Выдается продавцу банком при заведении терминала',
  })
  TerminalKey: string;

  // @IsString()
  @ApiModelProperty({
    type: 'string',
    example: '',
    required: true,
  })
  OrderId: string;

  // @IsBoolean()
  @ApiModelProperty({
    type: 'boolean',
    example: true,
    required: true,
  })
  Success: boolean;

  // @IsString()
  @ApiModelProperty({
    type: 'string',
    example: '',
    required: true,
  })
  Status: PaymentStatus;

  // @IsNumber()
  @ApiModelProperty({
    type: 'number',
    example: '',
    required: true,
  })
  PaymentId: number;

  // @IsString()
  @ApiModelProperty({
    type: 'string',
    example: '',
    required: true,
  })
  ErrorCode: string;

  // @IsNumber()
  @ApiModelProperty({
    type: 'number',
    example: '',
    required: true,
  })
  Amount: number;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty({
    type: 'number',
    example: '',
    required: true,
  })
  Rebilld?: number;

  // @IsNumber()
  @ApiModelProperty({
    type: 'number',
    example: '',
    required: true,
  })
  CardId: number;

  // @IsString()
  @ApiModelProperty({
    type: 'string',
    example: '',
    required: true,
  })
  Pan: string;

  // @IsString()
  @ApiModelProperty({
    type: 'string',
    example: '',
    required: true,
  })
  ExpDate: string;

  // @IsString()
  @ApiModelProperty({
    type: 'string',
    example: '',
    required: true,
  })
  Token: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: '',
    required: true,
  })
  DATA?: string;
}
