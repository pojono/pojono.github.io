import { EntityRepository, Repository } from 'typeorm';
import { StatisticLesson } from '../entity/statistic.lesson.entity';
// import { FINISH_EDGE } from '../service/statistic.service';

@EntityRepository(StatisticLesson)
export class StatisticLessonRepository extends Repository<StatisticLesson> {
  async findByUserIdAndLessonId(
    userId: number,
    lessonId: number,
  ): Promise<StatisticLesson | undefined> {
    return StatisticLesson.findOne({
      where: {
        userId,
        lessonId,
      },
    });
  }

  async createStats(
    userId: number,
    lessonId: number,
    trackId: number,
    courseId: number,
  ): Promise<StatisticLesson> {
    const statsLesson: StatisticLesson = new StatisticLesson();
    statsLesson.userId = userId;
    statsLesson.lessonId = lessonId;
    statsLesson.trackId = trackId;
    statsLesson.courseId = courseId;
    return statsLesson.save();
  }

  async setProgress(
    statsLesson: StatisticLesson,
    progress: number,
  ): Promise<void> {
    if (progress > statsLesson.progress) {
      statsLesson.progress = progress;
      await statsLesson.save();
    }
  }

  async countFinishedByUserId(userId: number): Promise<number> {
    // #STATS-13
    const { count } = await this.createQueryBuilder('statistic_lesson')
      .select(`COUNT(statistic_lesson.id)`, 'count')
      .where({
        userId,
      })
      .andWhere(`progress >= 90`) // TODO: move to config
      .getRawOne();
    return Number(count);
  }

  async countFinishedByUserIdAndCourseId(
    userId: number,
    courseId: number,
  ): Promise<number> {
    // #STATS-5
    const { count } = await this.createQueryBuilder('statistic_lesson')
      .select(`COUNT(statistic_lesson.id)`, 'count')
      .where({
        userId,
        courseId,
      })
      .andWhere(`progress >= 90`) // TODO: move to config
      .getRawOne();
    return Number(count);
  }

  async countStartedByUserIdAndCourseId(
    userId: number,
    courseId: number,
  ): Promise<number> {
    const { count } = await this.createQueryBuilder('statistic_lesson')
      .select(`COUNT(statistic_lesson.id)`, 'count')
      .where({
        userId,
        courseId,
      })
      .getRawOne();
    return Number(count);
  }
}
