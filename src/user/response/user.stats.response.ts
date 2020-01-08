import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';

class UserStatsResponseDto {
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

export class UserStatsResponse extends CustomResponse {
  @ApiModelProperty({ type: UserStatsResponseDto })
  data: UserStatsResponseDto;

  constructor(requestId: string, data: UserStatsResponseDto) {
    super(requestId);
    this.data = data;
  }
}
