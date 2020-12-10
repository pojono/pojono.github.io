import { IsString, MaxLength, MinLength, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PromocodeActivateRequestDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiModelProperty({
    type: 'string',
    example: '12345678',
    required: true,
  })
  phone: string;

  @IsString()
  @Length(4, 20)
  @ApiModelProperty({
    type: 'string',
    example: 'TEST CODE',
    required: true,
  })
  promocode: string;
}
