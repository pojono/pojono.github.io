import { ApiModelProperty } from '@nestjs/swagger';

export default class CustomResponse {
  @ApiModelProperty({
    type: 'boolean',
    nullable: false,
    isArray: false,
  })
  public readonly success: boolean;

  @ApiModelProperty({
    type: 'string',
    format: 'date-time',
    nullable: false,
    isArray: false,
  })
  public readonly timestamp: Date;

  @ApiModelProperty({
    type: 'string',
    nullable: false,
    isArray: false,
  })
  public readonly requestId: string;

  constructor(requestId: string, success: boolean = true) {
    this.success = success;
    this.timestamp = new Date();
    this.requestId = requestId;
  }
}
