import { EntityRepository, Repository } from 'typeorm';
import { StatisticHistory } from '../entity/statistic.history.entity';
import * as moment from 'moment';

@EntityRepository(StatisticHistory)
export class StatisticHistoryRepository extends Repository<StatisticHistory> {
  async createStats(
    userId: number,
    trackId: number,
    progress: number,
    diff: number,
  ): Promise<StatisticHistory> {
    const statsHistory: StatisticHistory = new StatisticHistory();
    statsHistory.userId = userId;
    statsHistory.trackId = trackId;
    statsHistory.progress = progress;
    statsHistory.diff = diff;
    statsHistory.datetime = moment.utc().toDate();
    return statsHistory.save();
  }
}