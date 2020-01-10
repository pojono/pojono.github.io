import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticTrackRepository } from '../repository/statistic.track.repository';
import { StatisticTrack } from '../entity/statistic.track.entity';

@Injectable()
export class StatisticTrackService {
  constructor(
    @InjectRepository(StatisticTrackRepository)
    private statisticTrackRepository: StatisticTrackRepository,
  ) {}

  async updateProgress(
    userId: number,
    trackId: number,
    progress: number,
  ): Promise<void> {
    let statsTrack:
      | StatisticTrack
      | undefined = await this.statisticTrackRepository.findByUserIdAndTrackId(
      userId,
      trackId,
    );
    if (!statsTrack) {
      statsTrack = await this.statisticTrackRepository.createStats(
        userId,
        trackId,
      );
    }
    await this.statisticTrackRepository.setProgress(statsTrack, progress);
  }

  async getStatsByUserIdAndTrackId(
    userId: number,
    trackId: number,
  ): Promise<StatisticTrack | undefined> {
    return this.statisticTrackRepository.findByUserIdAndTrackId(
      userId,
      trackId,
    );
  }
}
