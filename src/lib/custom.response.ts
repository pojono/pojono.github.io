import { ApiModelProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { logger } from './logger';

export default class CustomResponse {
  @ApiModelProperty({
    type: 'boolean',
    nullable: false,
    isArray: false,
    default: true,
    example: true,
  })
  public readonly success: boolean;

  @ApiModelProperty({
    type: 'string',
    format: 'date-time',
    nullable: false,
    isArray: false,
    example: '2019-11-14T10:06:14.109Z',
  })
  public readonly timestamp: Date;

  @ApiModelProperty({
    type: 'string',
    nullable: false,
    isArray: false,
    example: 'jcMhP42G5CT2Y7F0',
  })
  public readonly requestId: string;

  @ApiModelProperty({
    type: 'number',
    nullable: false,
    isArray: false,
    default: HttpStatus.OK,
    example: HttpStatus.OK,
  })
  public readonly statusCode: number;

  constructor(requestId: string, success: boolean = true) {
    this.success = success;
    this.timestamp = new Date();
    this.requestId = requestId;
    this.statusCode = HttpStatus.OK;
    logger(requestId).log('Response success: ' + success);
  }
}
