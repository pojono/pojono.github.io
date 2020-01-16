import { Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { TrackService } from './track.service';
import { Track } from '../entity/track.entity';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { ErrorIf } from '../../lib/error.if';
import { UserService } from '../../user/user.service';
import { GetStatisticMeDto } from '../response/get.statistic.me.response';
import { StatisticHourService } from './statistic.hour.service';
import * as moment from 'moment';
import { FastSupport } from '../entity/fast.support.entity';
import { FastSupportService } from './fast.support.service';
import { LessonService } from './lesson.service';
import { CourseService } from './course.service';
import { Lesson } from '../entity/lesson.entity';
import { Course } from '../entity/course.entity';
import { StatisticLessonService } from './statistic.lesson.service';
import { StatisticCourseService } from './statistic.course.service';
import { StatisticTrackService } from './statistic.track.service';
import { Rubric } from '../entity/rubric.entity';
import { RubricService } from './rubric.service';

export const FINISH_EDGE: number = 90;

@Injectable()
export class StatisticService {
  constructor(
    private trackService: TrackService,
    private userService: UserService,
    private statisticHourService: StatisticHourService,
    private fastSupportService: FastSupportService,
    private lessonService: LessonService,
    private courseService: CourseService,
    private statisticCourseService: StatisticCourseService,
    private statisticLessonService: StatisticLessonService,
    private statisticTrackService: StatisticTrackService,
    private rubricService: RubricService,
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

    // const fastSupport: FastSupport | undefined = await this.fastSupportService.getByTrackId(trackId);
    const lesson: Lesson | undefined = await this.lessonService.getByTrackId(
      trackId,
    );
    let course: Course | undefined;
    if (lesson) {
      course = await this.courseService.getById(lesson.courseId);
    }

    let isSleep: boolean = false;
    if (course) {
      const rubricIds: number[] = await this.courseService.getRubricIdsByCourseId(
        course.id,
      );
      if (rubricIds.length) {
        isSleep = await this.rubricService.isAnySleepRubricByIds(rubricIds);
      }
    }

    if (course) {
      await this.statisticLessonService.updateProgress(
        user.id,
        lesson.id,
        trackId,
        course.id,
        progress,
      );
      await this.statisticTrackService.updateProgress(
        user.id,
        trackId,
        progress,
      );
      await this.statisticCourseService.courseInProgress(user.id, course.id);
      if (lesson.isLatest && progress >= FINISH_EDGE) {
        await this.statisticCourseService.finishCourse(user.id, course.id);
      }
      await this.userService.updateLatestCourse(user, course.id);
    }

    await this.userService.updateStrike(user, utcDiff);

    await this.userService.updateSession(user);

    await this.userService.addTotalListenTime(user, deltaListenTime);

    await this.statisticHourService.addDuration(
      user.id,
      deltaListenTime,
      isSleep,
    );

    await this.userService.updateLastActivity(user);

    await this.userService.updateUtcDiff(user, utcDiff);

    await this.userService.subscriptionIsExpired(user);

    const shouldCheckSubscription: boolean = await this.userService.shouldCheckSubscriptionAgain(
      user,
    );

    if (shouldCheckSubscription) {
      await this.userService.updateSubscriptionStatus(user);
    }
  }

  async calculateAverageSessionTime(user: User): Promise<number> {
    // #STATS-9
    if (user.sessionsCounter <= 0) {
      return 0;
    }
    if (user.sessionsDuration <= 0) {
      return 0;
    }
    return Math.round(user.sessionsDuration / user.sessionsCounter);
  }

  async getMyStatistic(user: User): Promise<GetStatisticMeDto> {
    const userStartMonth: Date = moment
      .utc()
      .startOf('month')
      .add(user.utcDiff * -1, 'minutes')
      .toDate();

    // #STATS-7
    const currentStrike: number = user.currentStrike;

    const currentMonthTime: number = await this.statisticHourService.sumByUserIdAfterDate(
      user.id,
      userStartMonth,
      false,
    );

    const currentMonthSleepTime: number = await this.statisticHourService.sumByUserIdAfterDate(
      user.id,
      userStartMonth,
      true,
    );

    const averageSessionTime: number = await this.calculateAverageSessionTime(
      user,
    );

    // #STATS-8
    const totalListenTime: number = user.sessionsDuration;

    const finishedCourses: number = await this.statisticCourseService.countFinishedCoursesByUserId(
      user.id,
    );
    const finishedLessons: number = await this.statisticLessonService.countFinishedByUserId(
      user.id,
    );

    return {
      currentStrike,
      currentMonthTime,
      currentMonthSleepTime,
      averageSessionTime,
      totalListenTime,
      finishedCourses,
      finishedLessons,
    };
  }
}
