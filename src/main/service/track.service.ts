import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackResponseDto } from '../response/dto/track.response';
import { TrackRepository } from '../repository/track.repository';
import { LessonToTrackService } from './lesson.to.track.service';
import { Track } from '../entity/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackRepository)
    private trackRepository: TrackRepository,
    private lessonToTrackService: LessonToTrackService,
  ) {}

  async getByIds(ids: number[]): Promise<Track[]> {
    return this.trackRepository.findByIds(ids);
  }

  async getByLessonId(id: number): Promise<TrackResponseDto[]> {
    const trackIds: number[] = await this.lessonToTrackService.getByLessonId(
      id,
    );

    return this.getByIds(trackIds);
  }
}
