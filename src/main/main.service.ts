import { Injectable } from '@nestjs/common';
import { LessonService } from './service/lesson.service';
import { ChallengeService } from './service/challenge.service';
import { VideoAdviceService } from './service/video.advice.service';
import { CourseService } from './service/course.service';
import { GetMainResponseDto } from './response/get.main.response';
import { CourseWithStatsResponseDto } from './response/dto/course.with.stats.response';
import { MainStatsResponseDto } from './response/dto/main.stats.response';
import { FastSupportResponseDto } from './response/dto/fast.support.response';
import { VideoAdviceResponseDto } from './response/dto/video.advice.response';
import { FastSupportService } from './service/fast.support.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { StatisticHourService } from './service/statistic.hour.service';
// import { StatisticCourseService } from './service/statistic.course.service';

@Injectable()
export class MainService {
  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private challengeService: ChallengeService,
    private videoAdviceService: VideoAdviceService,
    private fastSupportService: FastSupportService,
    private userService: UserService,
    private statisticHourService: StatisticHourService,
  ) {}

  async getMainStats(user: User): Promise<MainStatsResponseDto> {
    return {
      todayUsers: await this.userService.countTodayUsers(),
      todayUsersTime: await this.statisticHourService.sumForAllUsersLastDay(
        user,
      ),
      maxStrike: await this.userService.maxStrike(),
      myCurrentStrike: user.currentStrike,
      myMaxStrike: user.maxStrike,
      myTodayTime: await this.statisticHourService.sumForUserLastDay(user),
      totalListenTime: user.sessionsDuration,
    };
  }

  async main(user: User): Promise<GetMainResponseDto> {
    const topCourse: CourseWithStatsResponseDto = await this.courseService.getTopCourse(
      user,
    );
    const stats: MainStatsResponseDto = await this.getMainStats(user);
    const loginMotivation = {};

    const bestCourses: CourseWithStatsResponseDto[] = await this.courseService.getBestCourses(
      user.id,
    );
    const announcement: CourseWithStatsResponseDto[] = await this.courseService.getAnnouncementCourses(
      user.id,
    );
    const fastSupport: FastSupportResponseDto[] = await this.fastSupportService.getForMainPage();
    const videoAdvice: VideoAdviceResponseDto[] = await this.videoAdviceService.getForMainPage();

    const response: GetMainResponseDto = {
      topCourse,
      videoAdvice,
      stats,
      loginMotivation,
      bestCourses,
      fastSupport,
      announcement,
    };

    if (user.phone) {
      delete response.loginMotivation;
    } else {
      delete response.stats;
    }

    return response;
  }
}
