import { ApiModelProperty } from '@nestjs/swagger';

export class FastSupportResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly id: number;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly name: string;

  @ApiModelProperty({ type: 'number', nullable: true })
  public readonly trackId: number;

  @ApiModelProperty({ type: 'boolean', nullable: false })
  public readonly forMainPage: boolean;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly colour: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly duration: string;

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
  public readonly affirmationForShare: string;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    description: 'Текст аффирмации для наложения на картинку',
  })
  public readonly affirmationText: string;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    description: 'Автор цитаты',
  })
  public readonly quoteAuthor: string;
}
