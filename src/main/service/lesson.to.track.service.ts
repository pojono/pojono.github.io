import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RubricRepository } from '../repository/rubric.repository';
import { Lesson } from '../entity/rubric.entity';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { GetRubricByIdResponseDto } from '../response/get.rubric.by.id.response';
import { CourseWithStatsResponseDto } from '../response/dto/course.with.stats.response';
import { CourseService } from './course.service';
import { LessonToCourse } from '../entity/rubric.to.course.entity';
import { RubricToCourseRepository } from '../repository/rubric.to.course.repository';
import { LessonToTrackRepository } from '../repository/lesson.to.track.repository';
import { LessonToTrack } from '../entity/lesson.to.track.entity';

@Injectable()
export class LessonToTrackService {
  constructor(
    @InjectRepository(LessonToTrackRepository)
    private lessonToTrackRepository: LessonToTrackRepository,
  ) {}

  async getByLessonId(lessonId: number): Promise<number[]> {
    const lessonToTrack: LessonToTrack[] = await this.lessonToTrackRepository.findByLessonId(
      lessonId,
    );
    return lessonToTrack.map(element => element.lessonId);
  }
}
