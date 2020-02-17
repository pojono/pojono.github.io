import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticLessonRepository } from '../repository/statistic.lesson.repository';
import { StatisticLesson } from '../entity/statistic.lesson.entity';

@Injectable()
export class StatisticLessonService {
  constructor(
    @InjectRepository(StatisticLessonRepository)
    private statisticLessonRepository: StatisticLessonRepository,
  ) {}

  async updateProgress(
    userId: number,
    lessonId: number,
    trackId: number,
    courseId: number,
    progress: number,
  ): Promise<void> {
    let statsLesson:
      | StatisticLesson
      | undefined = await this.statisticLessonRepository.findByUserIdAndLessonId(
      userId,
      lessonId,
    );
    if (!statsLesson) {
      statsLesson = await this.statisticLessonRepository.createStats(
        userId,
        lessonId,
        trackId,
        courseId,
      );
    }
    await this.statisticLessonRepository.setProgress(statsLesson, progress);
  }

  async countFinishedByUserId(userId: number): Promise<number> {
    return this.statisticLessonRepository.countFinishedByUserId(userId);
  }

  async countFinishedByUserIdAndCourseId(
    userId: number,
    courseId: number,
  ): Promise<number> {
    return this.statisticLessonRepository.countFinishedByUserIdAndCourseId(
      userId,
      courseId,
    );
  }

  async countStartedByUserIdAndCourseId(
    userId: number,
    courseId: number,
  ): Promise<number> {
    return this.statisticLessonRepository.countStartedByUserIdAndCourseId(
      userId,
      courseId,
    );
  }
}
