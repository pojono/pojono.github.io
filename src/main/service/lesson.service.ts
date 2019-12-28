import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { LessonRepository } from '../repository/lesson.repository';
import { Lesson } from '../entity/lesson.entity';
import { TrackResponseDto } from '../response/dto/track.response';
import { LessonResponseDto } from '../response/dto/lesson.response';
import { GetLessonResponseDto } from '../response/get.lesson.response';
import { LessonToTrackService } from './lesson.to.track.service';
import { TrackService } from './track.service';
import { TrackWithStatsResponseDto } from '../response/dto/track.with.stats.response';

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

  async getLessonsByCourseId(id: number): Promise<LessonResponseDto[]> {
    return this.lessonRepository.findByCourseId(id);
  }

  async getLessonById(id: number): Promise<GetLessonResponseDto> {
    const lesson: LessonResponseDto = await this.getById(id);

    ErrorIf.isEmpty(lesson, OBJECT_NOT_FOUND);

    const track: TrackWithStatsResponseDto[] = await this.trackService.getByLessonId(
      id,
    );

    return { lesson, track };
  }

  async countOfLessonsByCourseId(courseId: number): Promise<number> {
    return Lesson.count({ where: { courseId } });
  }
}
