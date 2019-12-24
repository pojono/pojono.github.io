import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FastSupportRepository } from '../repository/fast.support.repository';
import { RubricToFastSupportService } from './rubric.to.fast.support.service';
import { FastSupportResponseDto } from '../response/dto/fast.support.response';
import { VideoAdviceWithStatsResponseDto } from '../response/dto/video.advice.with.stats.response';

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

  async getByRubricId(id: number): Promise<FastSupportResponseDto[]> {
    const fastSupportIds: number[] = await this.rubricToFastSupportService.getByRubricId(
      id,
    );

    return this.getByIds(fastSupportIds);
  }

  async getForMainPage(): Promise<FastSupportResponseDto[]> {
    // TODO: get fast support for main page
    return [];
  }
}
