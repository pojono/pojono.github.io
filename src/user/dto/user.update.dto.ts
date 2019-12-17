import { IsString, IsOptional } from 'class-validator';
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
}
