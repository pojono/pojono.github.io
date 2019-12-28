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

@Injectable()
export class MainService {
  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private challengeService: ChallengeService,
    private videoAdviceService: VideoAdviceService,
    private fastSupportService: FastSupportService,
    private userService: UserService,
  ) {}

  async getMainStats(): Promise<MainStatsResponseDto> {
    return {
      todayUsers: await this.userService.countTodayUsers(),
      todayUsersTime: 0, // TODO: count users time,
      maxStrike: await this.userService.maxStrike(),
    };
  }

  async main(user: User): Promise<GetMainResponseDto> {
    const topCourse: CourseWithStatsResponseDto = await this.courseService.getTopCourse(
      user,
    );
    const stats: MainStatsResponseDto = await this.getMainStats();
    const bestCourses: CourseWithStatsResponseDto[] = await this.courseService.getBestCourses();
    const announcement: CourseWithStatsResponseDto[] = await this.courseService.getAnnouncementCourses();
    const fastSupport: FastSupportResponseDto[] = await this.fastSupportService.getForMainPage();
    const videoAdvice: VideoAdviceResponseDto[] = await this.videoAdviceService.getForMainPage();

    return {
      topCourse,
      stats,
      bestCourses,
      announcement,
      fastSupport,
      videoAdvice,
    };
  }
}
