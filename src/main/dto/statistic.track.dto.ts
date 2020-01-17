import { IsNumber, Max, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class StatisticTrackDto {
  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiModelProperty({
    type: 'number',
    example: 60,
    required: true,
    minimum: 1,
    maximum: 100,
    description: 'Текущий прогресс прослушивания, в % от длины трека',
  })
  progress: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiModelProperty({
    type: 'number',
    example: 10,
    required: true,
    minimum: 1,
    maximum: 100,
    description:
      'Сколько прослушано с момента последней отправки статистики, в % от длины трека',
  })
  diff: number;

  @IsNumber()
  @Min(-720)
  @Max(720)
  @ApiModelProperty({
    type: 'number',
    example: -180,
    required: true,
    minimum: -720,
    maximum: 720,
    description: 'Разница в минутах между местным временем пользователя и UTC',
  })
  utcDiff: number;
}
