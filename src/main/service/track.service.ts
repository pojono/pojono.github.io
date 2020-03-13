import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackResponseDto } from '../response/dto/track.response';
import { TrackRepository } from '../repository/track.repository';
import { LessonToTrackService } from './lesson.to.track.service';
import { Track } from '../entity/track.entity';
import { TrackWithStatsResponseDto } from '../response/dto/track.with.stats.response';
import { TrackStatsResponseDto } from '../response/dto/track.stats.response';
import { StatisticTrackService } from './statistic.track.service';
import { StatisticTrack } from '../entity/statistic.track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackRepository)
    private trackRepository: TrackRepository,
    private lessonToTrackService: LessonToTrackService,
    private statisticTrackService: StatisticTrackService,
  ) {}

  async getByIds(ids: number[]): Promise<Track[]> {
    return this.trackRepository.findByIds(ids);
  }

  async getById(id: number) {
    return this.trackRepository.findById(id);
  }

  async getSecondsByPercent(track: Track, percent: number): Promise<number> {
    if (!track.duration) {
      return 0;
    }
    return Math.round((track.duration * percent) / 100);
  }

  async getTrackStatsById(
    userId: number,
    trackId: number,
  ): Promise<TrackStatsResponseDto> {
    const trackStats:
      | StatisticTrack
      | undefined = await this.statisticTrackService.getStatsByUserIdAndTrackId(
      userId,
      trackId,
    );
    return {
      lastProgress: trackStats ? trackStats.lastProgress : 0,
      maxProgress: trackStats ? trackStats.maxProgress : 0,
    };
  }

  async getTrackWithStatsById(
    userId: number,
    trackId: number,
  ): Promise<TrackWithStatsResponseDto> {
    return {
      trackInfo: await this.getById(trackId),
      trackStats: await this.getTrackStatsById(userId, trackId),
    };
  }

  async getByLessonId(
    userId: number,
    id: number,
  ): Promise<TrackWithStatsResponseDto[]> {
    const trackIds: number[] = await this.lessonToTrackService.getByLessonId(
      id,
    );

    const tracks: TrackWithStatsResponseDto[] = [];

    for (const trackId of trackIds) {
      tracks.push(await this.getTrackWithStatsById(userId, trackId));
    }

    /*
    const lessonAlreadyListen: boolean = tracks.some(
      track => track.trackStats.maxProgress > 0,
    );

    if (lessonAlreadyListen) {
      return tracks.filter(track => track.trackStats.maxProgress > 0);
    }
    */

    return tracks;
  }
}
