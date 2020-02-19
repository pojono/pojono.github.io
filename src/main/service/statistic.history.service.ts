import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticHistoryRepository } from '../repository/statistic.history.repository';

@Injectable()
export class StatisticHistoryService {
  constructor(
    @InjectRepository(StatisticHistoryRepository)
    private statisticHistoryRepository: StatisticHistoryRepository,
  ) {}

  async createStats(
    userId: number,
    trackId: number,
    progress: number,
    diff: number,
  ): Promise<void> {
    await this.statisticHistoryRepository.createStats(
      userId,
      trackId,
      progress,
      diff,
    );
  }
}
