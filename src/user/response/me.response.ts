import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { User } from '../user.entity';
import { AppTypeEnum } from '../app.type.enum';
import { StoreEnviromentEnum } from '../store.environment.enum';
import { Column } from 'typeorm';

class MeResponseDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly id: number;

  @ApiModelProperty({ type: 'string', nullable: false })
  public readonly phone: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly firstName: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly lastName: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly session: string;

  @ApiModelProperty({ type: 'string', nullable: true, format: 'date-time' })
  public readonly lastCode: Date;

  @ApiModelProperty({ type: 'number', nullable: true })
  public readonly latestCourseId: number;

  @ApiModelProperty({ type: 'string', nullable: true, format: 'date-time' })
  public readonly lastActivity: Date;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly picture: string;

  @ApiModelProperty({ type: 'number', nullable: false, default: 0 })
  public readonly currentStrike: number;

  @ApiModelProperty({ type: 'number', nullable: false, default: 0 })
  public readonly maxStrike: number;

  @ApiModelProperty({ type: 'number', nullable: false, default: 0 })
  public readonly sessionsCounter: number;

  @ApiModelProperty({ type: 'number', nullable: false, default: 0 })
  public readonly sessionsDuration: number;

  @ApiModelProperty({
    type: 'number',
    nullable: false,
    default: 0,
    example: -180,
  })
  public readonly utcDiff: number;

  @ApiModelProperty({
    type: AppTypeEnum,
    nullable: true,
    enum: [AppTypeEnum.ANDROID, AppTypeEnum.IOS],
  })
  public readonly subscriptionPlatform: string;

  @ApiModelProperty({
    type: StoreEnviromentEnum,
    nullable: true,
    enum: [StoreEnviromentEnum.SANDBOX, StoreEnviromentEnum.PRODUCTION],
  })
  public readonly subscriptionEnvironment: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly subscriptionProductId: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly subscriptionTransactionId: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly subscriptionLatestReceipt: string;

  @ApiModelProperty({ type: 'string', nullable: true })
  public readonly subscriptionValidationResponse: string;

  @ApiModelProperty({ type: 'string', nullable: true, format: 'date-time' })
  public readonly subscriptionStartDate: Date;

  @ApiModelProperty({ type: 'string', nullable: true, format: 'date-time' })
  public readonly subscriptionEndDate: Date;

  @ApiModelProperty({ type: 'boolean', nullable: false, default: false })
  public readonly subscriptionIsCancelled: boolean;

  @ApiModelProperty({ type: 'string', nullable: true, format: 'date-time' })
  public readonly subscriptionLastValidation: Date;

  @ApiModelProperty({ type: 'boolean', nullable: false, default: false })
  isPushesSkipped: boolean;

  @ApiModelProperty({ type: 'string', nullable: true })
  pushesTime: string;

  @ApiModelProperty({ type: 'boolean', nullable: false, default: false })
  firstQuizFinished: boolean;
}

export class MeResponse extends CustomResponse {
  @ApiModelProperty({ type: MeResponseDto })
  data: MeResponseDto;

  constructor(requestId: string, data: User) {
    super(requestId);
    this.data = data;
  }
}
