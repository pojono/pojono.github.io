import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class QuizAnswerDto {
  @IsNumber()
  @ApiModelProperty({
    type: 'number',
    example: 25,
    required: true,
    description: 'Id ответа из квиза',
  })
  answerId: number;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty({
    type: 'number',
    example: 10,
    required: false,
    description: 'Числовой ответ для RANGE',
  })
  range: number;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({
    type: 'number',
    example: [1, 2, 3],
    required: false,
    description: 'Массив чисел для ответа на MULTICHOICE',
    isArray: true,
  })
  multichoice: number[];

  @IsOptional()
  @IsString()
  @ApiModelProperty({
    type: 'string',
    example: 'John',
    required: false,
    description: 'Строка для ответа на INPUT',
  })
  input: string;
}
