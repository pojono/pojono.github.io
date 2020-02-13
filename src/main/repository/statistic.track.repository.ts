import { EntityRepository, Repository } from 'typeorm';
import { StatisticTrack } from '../entity/statistic.track.entity';

@EntityRepository(StatisticTrack)
export class StatisticTrackRepository extends Repository<StatisticTrack> {
  async findByUserIdAndTrackId(
    userId: number,
    trackId: number,
  ): Promise<StatisticTrack | undefined> {
    return StatisticTrack.findOne({
      where: {
        userId,
        trackId,
      },
    });
  }

  async createStats(userId: number, trackId: number): Promise<StatisticTrack> {
    const statsTrack: StatisticTrack = new StatisticTrack();
    statsTrack.userId = userId;
    statsTrack.trackId = trackId;
    return statsTrack.save();
  }

  async setProgress(
    statsTrack: StatisticTrack,
    progress: number,
  ): Promise<void> {
    const MAX_PROGRESS: number = 100;

    statsTrack.lastProgress = progress;

    if (statsTrack.lastProgress > statsTrack.maxProgress) {
      statsTrack.maxProgress = statsTrack.lastProgress;
    }

    if (statsTrack.lastProgress >= MAX_PROGRESS) {
      statsTrack.lastProgress = 0;
    }

    await statsTrack.save();
  }
}
