import { ApiModelProperty } from '@nestjs/swagger';

export class CheckboxResponseDto {
  @ApiModelProperty({
    type: 'string',
    nullable: true,
    isArray: false,
  })
  public readonly checkboxText: string;

  @ApiModelProperty({
    type: 'string',
    nullable: true,
    isArray: false,
  })
  public readonly checkboxButton: string;

  @ApiModelProperty({
    type: 'number',
    nullable: true,
    isArray: false,
  })
  public readonly checkboxAnswerId: number;
}