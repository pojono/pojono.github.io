import { Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { TrackService } from './track.service';
import { Track } from '../entity/track.entity';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { ErrorIf } from '../../lib/error.if';
import { UserService } from '../../user/user.service';

@Injectable()
export class StatisticService {
  constructor(
    private trackService: TrackService,
    private userService: UserService,
  ) {}

  async updateStatisticTrack(
    trackId: number,
    progress: number,
    diff: number,
    utcDiff: number,
    user: User,
  ): Promise<void> {
    const track: Track = await this.trackService.getById(trackId);
    ErrorIf.isEmpty(track, OBJECT_NOT_FOUND);

    const deltaListenTime: number = await this.trackService.getSecondsByPercent(
      track,
      diff,
    );

    await this.userService.updateStrike(user, utcDiff);

    await this.userService.updateSession(user);

    await this.userService.addTotalListenTime(user, deltaListenTime);

    await this.userService.updateLastActivity(user);

    await this.userService.updateUtcDiff(user, utcDiff);
  }
}
