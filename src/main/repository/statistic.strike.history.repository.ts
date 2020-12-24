import { EntityRepository, Repository } from 'typeorm';
import * as moment from 'moment';
import { StatisticStrikeHistory } from '../entity/statistic.strike.history.entity';

@EntityRepository(StatisticStrikeHistory)
export class StatisticStrikeHistoryRepository extends Repository<
  StatisticStrikeHistory
> {
  async createStrikeHistory(
    userId: number,
    trackId: number,
    from: number,
    to: number,
    utcDiff: number,
  ): Promise<StatisticStrikeHistory> {
    const statsStrikeHistory: StatisticStrikeHistory = new StatisticStrikeHistory();
    statsStrikeHistory.userId = userId;
    statsStrikeHistory.trackId = trackId;
    statsStrikeHistory.from = from;
    statsStrikeHistory.to = to;
    statsStrikeHistory.utcDiff = utcDiff;
    statsStrikeHistory.datetime = moment.utc().toDate();
    return statsStrikeHistory.save();
  }
}
