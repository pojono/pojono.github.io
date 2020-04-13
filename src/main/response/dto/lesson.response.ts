import { ApiModelProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class LessonResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly id: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly courseId: number;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly name: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly description: string;

  @ApiModelProperty({ type: 'boolean', nullable: false })
  public readonly isLatest: boolean;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly colour: string;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    description: 'Картинка для аффирмации без текста',
  })
  public readonly affirmation: string;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    description: 'Картинка с уже наложенным текстом',
  })
  affirmationForShare: string;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    description: 'Текст аффирмации для наложения на картинку',
  })
  affirmationText: string;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    description: 'Автор цитаты',
  })
  quoteAuthor: string;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly orderIndex: number;
}
