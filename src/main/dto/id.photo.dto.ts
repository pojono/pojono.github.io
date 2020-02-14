import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class IdPhotoDto {
  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: 'example.jpg',
    required: true,
  })
  photoId: string;
}
