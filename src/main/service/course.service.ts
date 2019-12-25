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

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
    private rubricToCourseService: RubricToCourseService,

    private lessonService: LessonService,
    private challengeService: ChallengeService,
    private videoAdviceService: VideoAdviceService,
  ) {}

  async getByIds(ids: number[]) {
    return this.courseRepository.findByIds(ids);
  }

  async getById(id: number) {
    return this.courseRepository.findById(id);
  }

  async getCourseById(id: number): Promise<GetCourseByIdResponseDto> {
    const course: CourseWithStatsResponseDto = await this.getCourseWithStatsById(
      id,
    );
    const lesson: LessonResponseDto[] = await this.lessonService.getLessonsByCourseId(
      id,
    );
    const challenge: ChallengeResponseDto = await this.challengeService.getChallengeByCourseId(
      id,
    );
    const videoAdvice: VideoAdviceWithStatsResponseDto[] = await this.videoAdviceService.getVideoAdvicesWithStatsByCourseId(
      id,
    );
    return {
      course,
      lesson,
      challenge,
      videoAdvice,
    };
  }

  async getCourseStats(courseId: number): Promise<CourseStatsResponseDto> {
    return {
      // TODO: count stats
      numberOfLessons: 0,
      finishedLessons: 0,
      numberOfStudents: 0,
    };
  }

  async getLatestCourseIdForUser(userId: number): Promise<number> {
    return null;
  }

  async getTopCourse(userId: number): Promise<CourseWithStatsResponseDto> {
    let latestCourseId: number = await this.getLatestCourseIdForUser(userId);

    if (!latestCourseId) {
      latestCourseId = await this.getBeginnerCourseId();
    }
    return this.getCourseWithStatsById(latestCourseId);
  }

  async getBeginnerCourseId(): Promise<number> {
    const beginnerCourse: Course = await this.courseRepository.findBeginnerCourse();
    ErrorIf.notExist(beginnerCourse, BEGINNER_COURSE_NOT_FOUND);
    return beginnerCourse.id;
  }

  async getBestCourses(): Promise<CourseWithStatsResponseDto[]> {
    const courseIds = await this.courseRepository.findBestCourseIds();
    return this.getCoursesWithStatsByIds(courseIds);
  }

  async getCoursesWithStatsByIds(
    courseIds: number[],
  ): Promise<CourseWithStatsResponseDto[]> {
    const courses: CourseWithStatsResponseDto[] = [];

    for (const courseId of courseIds) {
      courses.push(await this.getCourseWithStatsById(courseId));
    }
    return courses;
  }

  async getAnnouncementCourses(): Promise<CourseWithStatsResponseDto[]> {
    const courseIds: number[] = await this.courseRepository.findAnnouncementCoursesIds();
    return this.getCoursesWithStatsByIds(courseIds);
  }

  async getCourseWithStatsById(
    courseId: number,
  ): Promise<CourseWithStatsResponseDto> {
    return {
      courseInfo: await this.getById(courseId),
      courseStats: await this.getCourseStats(courseId),
    };
  }

  async getByRubricId(id: number): Promise<CourseWithStatsResponseDto[]> {
    const courseIds: number[] = await this.rubricToCourseService.getByRubricId(
      id,
    );
    return this.getCoursesWithStatsByIds(courseIds);
  }
}
