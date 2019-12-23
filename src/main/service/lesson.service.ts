import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from '../repository/course.repository';
import { Course } from '../entity/course.entity';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { GetCourseByIdResponseDto } from '../response/get.course.by.id.response';
import { CourseWithStatsResponseDto } from '../response/dto/course.with.stats.response';
import { RubricToCourseRepository } from '../repository/rubric.to.course.repository';
import { RubricToCourseService } from './rubric.to.course.service';
import { FastSupportRepository } from '../repository/fast.support.repository';
import { RubricToFastSupportService } from './rubric.to.fast.support.service';
import { FastSupport } from '../entity/fast.support.entity';
import { FastSupportResponseDto } from '../response/dto/fast.support.response';
import { LessonRepository } from '../repository/lesson.repository';
import { Lesson } from '../entity/lesson.entity';
import { TrackResponseDto } from '../response/dto/track.response';
import { LessonResponseDto } from '../response/dto/lesson.response';
import {
  GetLessonResponse,
  GetLessonResponseDto,
} from '../response/get.lesson.response';
import { LessonToTrackService } from './lesson.to.track.service';
import { TrackService } from './track.service';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
    private lessonToTrackService: LessonToTrackService,
    private trackService: TrackService,
  ) {}

  async getByIds(ids: number[]) {
    return this.lessonRepository.findByIds(ids);
  }

  async getById(id: number): Promise<Lesson | undefined> {
    return this.lessonRepository.findById(id);
  }

  async getLessonById(id: number): Promise<GetLessonResponseDto> {
    const lesson: LessonResponseDto = await this.getById(id);

    ErrorIf.isEmpty(lesson, OBJECT_NOT_FOUND);

    const trackIds: number[] = await this.lessonToTrackService.getByLessonId(
      id,
    );

    const track: TrackResponseDto[] = await this.trackService.getByIds(
      trackIds,
    );

    return { lesson, track };
  }
}
