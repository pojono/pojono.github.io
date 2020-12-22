import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticStrikeHistoryRepository } from '../repository/statistic.strike.history.repository';

@Injectable()
export class StatisticStrikeHistoryService {
  constructor(
    @InjectRepository(StatisticStrikeHistoryRepository)
    private statisticStrikeHistoryRepository: StatisticStrikeHistoryRepository,
  ) {}

  async createStats(
    userId: number,
    trackId: number,
    from: number,
    to: number,
    utcDiff: number,
  ): Promise<void> {
    await this.statisticStrikeHistoryRepository.createStrikeHistory(
      userId,
      trackId,
      from,
      to,
      utcDiff,
    );
  }
}
