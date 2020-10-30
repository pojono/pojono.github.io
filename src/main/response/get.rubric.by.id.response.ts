import { ApiModelProperty } from '@nestjs/swagger';
import CustomResponse from '../../lib/custom.response';
import { VideoAdviceResponseDto } from './dto/video.advice.response';
import { CourseWithStatsResponseDto } from './dto/course.with.stats.response';
import { FastSupportResponseDto } from './dto/fast.support.response';
import { RubricResponseDto } from './dto/rubric.response';
import { FastSupportWithStatsResponseDto } from './dto/fast.support.with.stats.response';

export class GetRubricByIdResponseDto {
  @ApiModelProperty({
    type: RubricResponseDto,
    nullable: false,
    isArray: false,
  })
  public readonly rubric: RubricResponseDto;

  @ApiModelProperty({
    type: CourseWithStatsResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly course: CourseWithStatsResponseDto[];

  @ApiModelProperty({
    type: FastSupportResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly fastSupport: FastSupportResponseDto[];

  @ApiModelProperty({
    type: VideoAdviceResponseDto,
    nullable: false,
    isArray: true,
  })
  public readonly videoAdvice: VideoAdviceResponseDto[];
}

export class GetRubricByIdResponse extends CustomResponse {
  @ApiModelProperty({
    type: GetRubricByIdResponseDto,
    isArray: false,
    nullable: false,
  })
  data: GetRubricByIdResponseDto;

  constructor(requestId: string, data: GetRubricByIdResponseDto) {
    super(requestId);
    this.data = data;
  }
}