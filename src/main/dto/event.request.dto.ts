import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { EventEnum } from '../event.enum';

export class EventRequestDto {
  @IsEnum(EventEnum)
  @ApiModelProperty({
    type: EventEnum,
    example: EventEnum.LESSON_FINISHED,
    required: true,
    enum: [
      EventEnum.LESSON_FINISHED,
      EventEnum.COURSE_FINISHED,
      EventEnum.AUTHORIZATION_FINISHED,
      EventEnum.APP_STARTED,
    ],
  })
  event: number;

  @IsOptional()
  @IsNumberString()
  @ApiModelProperty({
    type: 'number',
    example: 1,
    required: false,
  })
  id: number;
}
