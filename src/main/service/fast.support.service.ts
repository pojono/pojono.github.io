import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FastSupportRepository } from '../repository/fast.support.repository';
import { RubricToFastSupportService } from './rubric.to.fast.support.service';
import { FastSupportResponseDto } from '../response/dto/fast.support.response';
import { VideoAdviceWithStatsResponseDto } from '../response/dto/video.advice.with.stats.response';
import { FastSupportWithStatsResponseDto } from '../response/dto/fast.support.with.stats.response';
import { FastSupport } from '../entity/fast.support.entity';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { TrackWithStatsResponseDto } from '../response/dto/track.with.stats.response';
import { TrackService } from './track.service';
import { GetFastSupportResponseDto } from '../response/get.fast.support.response';

@Injectable()
export class FastSupportService {
  constructor(
    @InjectRepository(FastSupportRepository)
    private fastSupportRepository: FastSupportRepository,
    private rubricToFastSupportService: RubricToFastSupportService,
    private trackService: TrackService,
  ) {}

  async getByIds(ids: number[]) {
    return this.fastSupportRepository.findByIds(ids);
  }

  async getById(id: number) {
    return this.fastSupportRepository.findById(id);
  }

  async getByTrackId(id: number) {
    return this.fastSupportRepository.findByTrackId(id);
  }

  async getFastSupportById(id: number): Promise<GetFastSupportResponseDto> {
    const fastSupport: FastSupport = await this.getById(id);
    ErrorIf.isEmpty(fastSupport, OBJECT_NOT_FOUND);

    const track: TrackWithStatsResponseDto = await this.trackService.getTrackWithStatsById(
      fastSupport.trackId,
    );

    return {
      fastSupport,
      track,
    };
  }

  async getByRubricId(id: number): Promise<FastSupportResponseDto[]> {
    const fastSupportIds: number[] = await this.rubricToFastSupportService.getByRubricId(
      id,
    );

    return this.getByIds(fastSupportIds);
  }

  async getForMainPage(): Promise<FastSupportResponseDto[]> {
    const fastSupport: FastSupport[] = await this.fastSupportRepository.findForMainPage();

    return fastSupport;
  }
}
