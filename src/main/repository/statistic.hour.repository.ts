import { EntityRepository, Repository } from 'typeorm';
import { StatisticHour } from '../entity/statistic.hour.entity';

@EntityRepository(StatisticHour)
export class StatisticHourRepository extends Repository<StatisticHour> {
  async findAll(): Promise<StatisticHour[]> {
    return StatisticHour.find();
  }

  async findByUserIdAndDate(
    userId: number,
    date: Date,
  ): Promise<StatisticHour | undefined> {
    return StatisticHour.findOne({
      where: {
        userId,
        date,
      },
    });
  }

  async createStats(userId: number, date: Date): Promise<StatisticHour> {
    const duration: number = 0;
    return StatisticHour.create({
      userId,
      date,
      duration,
    });
  }

  async addDuration(stats, duration): Promise<void> {
    stats.duration = stats.duration + duration;
    await stats.save();
  }

  async sumByUserIdAfterDate(
    userId: number,
    date: Date,
    forSleep: boolean,
  ): Promise<number> {
    const filters = {
      after: date.toISOString() as any,
    };

    const sleepColumn: string = forSleep ? 'Sleep' : '';

    const { sum } = await this.createQueryBuilder('statistic_hour')
      .select(`SUM(statistic_hour.duration${sleepColumn})`, 'sum')
      .where({
        userId,
      })
      .andWhere('date >= :after')
      .setParameters(filters)
      .getRawOne();
    return Number(sum);
  }
}
