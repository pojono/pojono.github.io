import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticLessonRepository } from '../repository/statistic.lesson.repository';

@Injectable()
export class LessonStatisticService {
  constructor(
    @InjectRepository(StatisticLessonRepository)
    private statisticLessonRepository: StatisticLessonRepository,
  ) {}

  async countFinishedByUserIdAndCourseId(
    userId: number,
    courseId: number,
  ): Promise<number> {
    return this.statisticLessonRepository.countFinishedByUserIdAndCourseId(
      userId,
      courseId,
    );
  }
}
