import { ApiModelProperty } from '@nestjs/swagger';

export class InputResponseDto {
  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
  })
  public readonly answerId: number;
}
