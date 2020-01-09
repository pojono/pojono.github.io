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

  async addDuration(userId: number, duration: number): Promise<void> {
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
  }
}
