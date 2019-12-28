import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetRequestId } from '../../lib/get.request.id.decorator';
import { IdRequestDto } from '../dto/id.request.dto';
import { StatisticService } from '../service/statistic.service';
import { PostStatisticTrackResponse } from '../response/post.statistic.track.response';
import { StatisticTrackDto } from '../dto/statistic.track.dto';

@Controller('statistics')
@ApiUseTags('statistics')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @Post('/track/:id')
  @ApiResponse({ status: 200, type: PostStatisticTrackResponse })
  @ApiOperation({
    title: 'Отправка статистики по прослушиванию треков',
    deprecated: true,
  })
  async updateTrackStatistic(
    @GetRequestId() requestId,
    @Param(ValidationPipe) idRequestDto: IdRequestDto,
    @Body(ValidationPipe) statisticTrackDto: StatisticTrackDto,
  ): Promise<PostStatisticTrackResponse> {
    await this.statisticService.updateStatisticTrack(
      idRequestDto.id,
      statisticTrackDto.progress,
      statisticTrackDto.diff,
    );
    return new PostStatisticTrackResponse(requestId, null);
  }
}
