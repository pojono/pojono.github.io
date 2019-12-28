import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FastSupportRepository } from '../repository/fast.support.repository';
import { RubricToFastSupportService } from './rubric.to.fast.support.service';
import { FastSupportResponseDto } from '../response/dto/fast.support.response';
import { VideoAdviceWithStatsResponseDto } from '../response/dto/video.advice.with.stats.response';
import { FastSupportWithStatsResponseDto } from '../response/dto/fast.support.with.stats.response';
import { FastSupport } from '../entity/fast.support.entity';

@Injectable()
export class FastSupportService {
  constructor(
    @InjectRepository(FastSupportRepository)
    private fastSupportRepository: FastSupportRepository,
    private rubricToFastSupportService: RubricToFastSupportService,
  ) {}

  async getByIds(ids: number[]) {
    return this.fastSupportRepository.findByIds(ids);
  }

  async getByRubricId(id: number): Promise<FastSupportWithStatsResponseDto[]> {
    const fastSupportIds: number[] = await this.rubricToFastSupportService.getByRubricId(
      id,
    );

    const fastSupport: FastSupport[] = await this.getByIds(fastSupportIds);

    const result: FastSupportWithStatsResponseDto[] = [];

    // TODO: refactor it
    for (const fs of fastSupport) {
      result.push({
        fastSupportInfo: fs,
        trackStats: {
          lastProgress: 0,
          maxProgress: 0,
        },
      });
    }

    return result;
  }

  async getForMainPage(): Promise<FastSupportWithStatsResponseDto[]> {
    const fastSupport: FastSupport[] = await this.fastSupportRepository.findForMainPage();

    const result: FastSupportWithStatsResponseDto[] = [];

    // TODO: refactor it
    for (const fs of fastSupport) {
      result.push({
        fastSupportInfo: fs,
        trackStats: {
          lastProgress: 0,
          maxProgress: 0,
        },
      });
    }

    return result;
  }
}
