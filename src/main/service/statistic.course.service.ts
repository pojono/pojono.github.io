import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticCourseRepository } from '../repository/statistic.course.repository';
import { StatisticCourse } from '../entity/statistic.course.entity';

@Injectable()
export class StatisticCourseService {
  constructor(
    @InjectRepository(StatisticCourseRepository)
    private statisticCourseRepository: StatisticCourseRepository,
  ) {}

  async courseInProgress(userId: number, courseId: number): Promise<void> {
    const statsCourse:
      | StatisticCourse
      | undefined = await this.statisticCourseRepository.findByUserIdAndCourseId(
      userId,
      courseId,
    );
    if (!statsCourse) {
      await this.statisticCourseRepository.createStats(userId, courseId);
    }
  }

  async finishCourse(userId: number, courseId: number): Promise<void> {
    const statsCourse:
      | StatisticCourse
      | undefined = await this.statisticCourseRepository.findByUserIdAndCourseId(
      userId,
      courseId,
    );
    if (statsCourse) {
      await this.statisticCourseRepository.setAsFinished(statsCourse);
    }
  }

  async countFinishedCoursesByUserId(userId: number): Promise<number> {
    return this.statisticCourseRepository.countFinishedCoursesByUserId(userId);
  }

  async countUsersOnCourseId(courseId: number): Promise<number> {
    return this.statisticCourseRepository.countUsersOnCourseId(courseId);
  }
}
