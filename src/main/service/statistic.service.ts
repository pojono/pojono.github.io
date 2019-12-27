import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticService {
  // constructor() {}

  async updateStatisticTrack(
    trackId: number,
    progress: number,
    diff: number,
  ): Promise<void> {
    // TODO: statistics
  }
}
