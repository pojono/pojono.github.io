import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from '../repository/course.repository';
import { Course } from '../entity/course.entity';
import { CourseWithStatsResponseDto } from '../response/dto/course.with.stats.response';
import { RubricToCourseService } from './rubric.to.course.service';
import { GetCourseByIdResponseDto } from '../response/get.course.by.id.response';
import { LessonResponseDto } from '../response/dto/lesson.response';
import { ChallengeResponseDto } from '../response/dto/challenge.response';
import { VideoAdviceWithStatsResponseDto } from '../response/dto/video.advice.with.stats.response';
import { LessonService } from './lesson.service';
import { VideoAdviceService } from './video.advice.service';
import { ChallengeService } from './challenge.service';
import { CourseStatsResponseDto } from '../response/dto/course.stats.response';
import { ErrorIf } from '../../lib/error.if';
import { BEGINNER_COURSE_NOT_FOUND } from '../../lib/errors';
import { User } from '../../user/user.entity';
import { VideoAdviceResponseDto } from '../response/dto/video.advice.response';
import { StatisticLessonService } from './statistic.lesson.service';
import { StatisticCourseService } from './statistic.course.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
    private rubricToCourseService: RubricToCourseService,

    private lessonService: LessonService,
    private challengeService: ChallengeService,
    private videoAdviceService: VideoAdviceService,

    private statisticLessonService: StatisticLessonService,
    private statisticCourseService: StatisticCourseService,
  ) {}

  async getByIds(ids: number[]) {
    return this.courseRepository.findByIds(ids);
  }

  async getById(id: number) {
    return this.courseRepository.findById(id);
  }

  async getCourseById(
    userId: number,
    id: number,
  ): Promise<GetCourseByIdResponseDto> {
    const course: CourseWithStatsResponseDto = await this.getCourseWithStatsById(
      userId,
      id,
    );
    const lesson: LessonResponseDto[] = await this.lessonService.getLessonsByCourseId(
      id,
    );
    const challenge: ChallengeResponseDto = await this.challengeService.getChallengeByCourseId(
      id,
    );
    const challengeShowAfterLessonIndex = challenge
      ? challenge.showAfterLessonIndex
      : null;
    const videoAdvice: VideoAdviceResponseDto[] = await this.videoAdviceService.getVideoAdvicesByCourseId(
      id,
    );
    return {
      course,
      lesson,
      challenge,
      challengeShowAfterLessonIndex,
      videoAdvice,
    };
  }

  async getCourseStats(
    userId: number,
    courseId: number,
  ): Promise<CourseStatsResponseDto> {
    return {
      numberOfLessons: await this.lessonService.countOfLessonsByCourseId(
        courseId,
      ),
      finishedLessons: await this.statisticLessonService.countFinishedByUserIdAndCourseId(
        userId,
        courseId,
      ),
      numberOfStudents: await this.statisticCourseService.countUsersOnCourseId(
        courseId,
      ),
    };
  }

  async getLatestCourseIdForUser(user: User): Promise<number> {
    return user.latestCourseId;
  }

  async getTopCourse(user: User): Promise<CourseWithStatsResponseDto> {
    let latestCourseId: number = await this.getLatestCourseIdForUser(user);

    if (!latestCourseId) {
      latestCourseId = await this.getBeginnerCourseId();
    }
    return this.getCourseWithStatsById(user.id, latestCourseId);
  }

  async getBeginnerCourseId(): Promise<number> {
    const beginnerCourse: Course = await this.courseRepository.findBeginnerCourse();
    ErrorIf.notExist(beginnerCourse, BEGINNER_COURSE_NOT_FOUND);
    return beginnerCourse.id;
  }

  async getBestCourses(userId: number): Promise<CourseWithStatsResponseDto[]> {
    const courseIds = await this.courseRepository.findBestCourseIds();
    return this.getCoursesWithStatsByIds(userId, courseIds);
  }

  async getCoursesWithStatsByIds(
    userId: number,
    courseIds: number[],
  ): Promise<CourseWithStatsResponseDto[]> {
    const courses: CourseWithStatsResponseDto[] = [];

    for (const courseId of courseIds) {
      courses.push(await this.getCourseWithStatsById(userId, courseId));
    }
    return courses;
  }

  async getAnnouncementCourses(
    userId: number,
  ): Promise<CourseWithStatsResponseDto[]> {
    const courseIds: number[] = await this.courseRepository.findAnnouncementCoursesIds();
    return this.getCoursesWithStatsByIds(userId, courseIds);
  }

  async getCourseWithStatsById(
    userId: number,
    courseId: number,
  ): Promise<CourseWithStatsResponseDto> {
    return {
      courseInfo: await this.getById(courseId),
      courseStats: await this.getCourseStats(userId, courseId),
    };
  }

  async getByRubricId(
    userId: number,
    id: number,
  ): Promise<CourseWithStatsResponseDto[]> {
    const courseIds: number[] = await this.rubricToCourseService.getByRubricId(
      id,
    );
    return this.getCoursesWithStatsByIds(userId, courseIds);
  }

  async getRubricIdsByCourseId(courseId: number): Promise<number[]> {
    return this.rubricToCourseService.getRubricIdsByCourseId(courseId);
  }
}
