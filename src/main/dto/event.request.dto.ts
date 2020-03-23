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
      EventEnum.APP_OPENED,
      EventEnum.VIDEO_STARTED,
      EventEnum.VIDEO_FINISHED,
      EventEnum.TRACK_STARTED,
      EventEnum.TRACK_FINISHED,
      EventEnum.COURSE_STARTED,
      EventEnum.CHALLENGE_ACCEPTED,
      EventEnum.GO_TO_RECOMMENDED_COURSE,
      EventEnum.AFFIRMATION_SHOWED,
      EventEnum.AFFIRMATION_SAVED,
      EventEnum.AFFIRMATION_SHARED,
    ],
  })
  event: EventEnum;

  @IsOptional()
  @IsNumberString()
  @ApiModelProperty({
    type: 'number',
    example: 1,
    required: false,
  })
  id: number;
}
