import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { User } from '../user.entity';

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
}

export class MeResponse extends CustomResponse {
  @ApiModelProperty({ type: MeResponseDto })
  data: MeResponseDto;

  constructor(requestId: string, data: User) {
    super(requestId);
    this.data = data;
  }
}
