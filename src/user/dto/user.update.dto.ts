import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: 'Кот',
    required: false,
  })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: 'Простоквашин',
    required: false,
  })
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: '08:30',
    required: false,
  })
  pushesTime: string;

  @IsOptional()
  @IsBoolean()
  @ApiModelProperty({
    type: 'string',
    example: true,
    required: false,
  })
  firstQuizFinished: boolean;

  @IsOptional()
  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: 'a7104da483c76954eb4c1f7be13db7841.jpg',
    required: false,
  })
  picture: string;
}
