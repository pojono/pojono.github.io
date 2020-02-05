import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class IdPhotoDto {
  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: 'adsflksdjfaklsf.jpg',
    required: true,
  })
  photoId: string;
}
