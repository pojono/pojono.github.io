import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return lessonToTrack.map(element => element.trackId);
  }
}
