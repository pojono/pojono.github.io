import { EntityRepository, Repository } from 'typeorm';
import { StatisticCourse } from '../entity/statistic.course.entity';

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

  // TODO: count finished courses by user
}
