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

  async finishCourse(userId: number, courseId: number): Promise<void> {
    let statsCourse:
      | StatisticCourse
      | undefined = await this.statisticCourseRepository.findByUserIdAndCourseId(
      userId,
      courseId,
    );
    if (!statsCourse) {
      statsCourse = await this.statisticCourseRepository.createStats(
        userId,
        courseId,
      );
    }
    await this.statisticCourseRepository.setAsFinished(statsCourse);
  }
}
