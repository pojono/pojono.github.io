import { EntityRepository, Repository } from 'typeorm';
import { StatisticCourse } from '../entity/statistic.course.entity';
import { FINISH_EDGE } from '../service/statistic.service';

@EntityRepository(StatisticCourse)
export class StatisticCourseRepository extends Repository<StatisticCourse> {
  async findByUserIdAndCourseId(
    userId: number,
    courseId: number,
  ): Promise<StatisticCourse | undefined> {
    return StatisticCourse.findOne({
      where: {
        userId,
        courseId,
      },
    });
  }

  async createStats(
    userId: number,
    courseId: number,
  ): Promise<StatisticCourse> {
    const statsCourse: StatisticCourse = new StatisticCourse();
    statsCourse.userId = userId;
    statsCourse.courseId = courseId;
    return statsCourse.save();
  }

  async setAsFinished(statsCourse: StatisticCourse): Promise<void> {
    statsCourse.isFinished = true;
    await statsCourse.save();
  }

  async countFinishedCoursesByUserId(userId: number): Promise<number> {
    // #STATS-12
    const { count } = await this.createQueryBuilder('statistic_course')
      .select(`COUNT(statistic_course.id)`, 'count')
      .where({
        userId,
        isFinished: true,
      })
      .getRawOne();
    return Number(count);
  }

  async countUsersOnCourseId(courseId: number): Promise<number> {
    // #STATS-6
    const { count } = await this.createQueryBuilder('statistic_course')
      .select(`COUNT(statistic_course.id)`, 'count')
      .where({
        courseId,
      })
      .getRawOne();
    return Number(count);
  }
}
