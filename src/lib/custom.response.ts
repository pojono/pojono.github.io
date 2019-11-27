import { ApiModelProperty } from '@nestjs/swagger';

export default class CustomResponse {
  @ApiModelProperty({ type: 'boolean' })
  public readonly success: boolean;

  @ApiModelProperty({
    type: 'string',
    format: 'date-time',
  })
  public readonly timestamp: Date;

  constructor(success: boolean = true) {
    this.success = success;
    this.timestamp = new Date();
  }
}
