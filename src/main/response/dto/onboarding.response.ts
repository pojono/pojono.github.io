import { ApiModelProperty } from '@nestjs/swagger';

export class OnboardingResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly id: number;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    isArray: false,
  })
  public readonly title: string;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    isArray: false,
  })
  public readonly description: string;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    isArray: false,
  })
  public readonly picture: string;

  @ApiModelProperty({
    type: 'number',
    nullable: true,
    isArray: false,
  })
  public readonly quizId: number;

  @ApiModelProperty({
    type: 'boolean',
    nullable: false,
    isArray: false,
    default: false,
    description: 'Для онбоардингов без авторизации',
  })
  public readonly forStart: boolean;
}
