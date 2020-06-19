import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticHourRepository } from '../repository/statistic.hour.repository';
import { User } from '../../user/user.entity';
import { StatisticHour } from '../entity/statistic.hour.entity';
import * as moment from 'moment';

@Injectable()
export class StatisticHourService {
  constructor(
    @InjectRepository(StatisticHourRepository)
    private statisticHourRepository: StatisticHourRepository,
  ) {}

  async sumForAllUsersLastDay(user: User): Promise<number> {
    // #STATS-3
    const dayAgo: Date = moment
      .utc()
      .subtract(24, 'hour')
      .add(user.utcDiff, 'minutes')
      .toDate();
    return this.sumAfterDate(dayAgo, false);
  }

  async sumForUserLastDay(user: User): Promise<number> {
    const dayAgo: Date = moment
      .utc()
      .subtract(24, 'hour')
      .add(user.utcDiff, 'minutes')
      .toDate();
    return this.sumByUserIdAfterDate(user.id, dayAgo, false);
  }

  async sumByUserIdAfterDate(
    userId: number,
    date: Date,
    forSleep: boolean,
  ): Promise<number> {
    return this.statisticHourRepository.sumByUserIdAfterDate(
      userId,
      date,
      forSleep,
    );
  }

  async sumAfterDate(date: Date, forSleep: boolean): Promise<number> {
    return this.statisticHourRepository.sumAfterDate(date, forSleep);
  }

  async addDuration(
    userId: number,
    duration: number,
    isSleep: boolean,
  ): Promise<void> {
    const currentHour = moment
      .utc()
      .startOf('hour')
      .toDate();
    let stats: StatisticHour = await this.statisticHourRepository.findByUserIdAndDate(
      userId,
      currentHour,
    );
    if (!stats) {
      stats = await this.statisticHourRepository.createStats(
        userId,
        currentHour,
      );
    }
    await this.statisticHourRepository.addDuration(stats, duration);
    if (isSleep) {
      await this.statisticHourRepository.addDurationSleep(stats, duration);
    }
  }
}
