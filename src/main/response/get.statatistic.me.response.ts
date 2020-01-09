import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

export class GetStatisticMeDto {
  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly currentStrike: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly currentMonthTime: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly currentMonthSleepTime: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly averageSessionTime: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly totalListenTime: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly finishedCourses: number;

  @ApiModelProperty({ type: 'number', nullable: false })
  public readonly finishedLessons: number;
}

export class GetStatatisticMeResponse extends CustomResponse {
  @ApiModelProperty({ type: GetStatisticMeDto })
  data: GetStatisticMeDto;

  constructor(requestId: string, data: GetStatisticMeDto) {
    super(requestId);
    this.data = data;
  }
}
