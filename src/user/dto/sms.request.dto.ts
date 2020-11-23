import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SmsRequestDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiModelProperty({
    type: 'string',
    example: '12345678',
    required: true,
  })
  phone: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA1NDU3NDg3LCJleHAiOjE2MDkwNTc0ODd9.RhPXLogVGRZZ2E6FJUbOqtBOvYzz-Bm3enBrZYD53Ts',
    required: true,
  })
  token?: string;
}
