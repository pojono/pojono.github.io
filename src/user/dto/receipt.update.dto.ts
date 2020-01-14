import { IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class IosPurchase {
  @ApiModelProperty({
    type: 'object',
    required: true,
  })
  transactionReceipt: any;
}

export class AndroidPurchase {
  @ApiModelProperty({
    type: 'object',
    required: true,
  })
  productId: any;

  @ApiModelProperty({
    type: 'object',
    required: true,
  })
  purchaseToken: any;
}

export class ReceiptUpdateDto {
  /*
  @IsEnum(AppTypeEnum)
  @ApiModelProperty({
    type: 'string',
    example: 'ios',
    required: true,
    enum: [
      AppTypeEnum.IOS,
      AppTypeEnum.ANDROID,
    ],
  })
  appType: string;
  */

  @IsOptional()
  @ApiModelProperty({
    type: IosPurchase,
    description: 'Чек с покупки в AppStore',
    required: true,
  })
  iosPurchase: IosPurchase;

  @IsOptional()
  @ApiModelProperty({
    type: AndroidPurchase,
    description: 'Чек с покупки в GooglePlay',
    required: true,
  })
  androidPurchase: AndroidPurchase;
}
