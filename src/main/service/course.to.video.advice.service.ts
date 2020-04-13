import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseToVideoAdvice } from '../entity/course.to.video.advice.entity';
import { CourseToVideoAdviceRepository } from '../repository/course.to.video.advice.repository';

@Injectable()
export class CourseToVideoAdviceService {
  constructor(
    @InjectRepository(CourseToVideoAdviceRepository)
    private courseToVideoAdviceRepository: CourseToVideoAdviceRepository,
  ) {}

  async getByCourseId(courseId: number): Promise<CourseToVideoAdvice[]> {
    const courseToVideoAdvices: CourseToVideoAdvice[] = await this.courseToVideoAdviceRepository.findByCourseId(
      courseId,
    );
    return courseToVideoAdvices;
    // return courseToVideoAdvices.map(element => element.videoAdviceId);
  }

  async getByCourseIdAndVideoAdviceId(
    courseId: number,
    videoAdviceId: number,
  ): Promise<CourseToVideoAdvice | undefined> {
    return this.courseToVideoAdviceRepository.findByCourseIdAndVideoAdviceId(
      courseId,
      videoAdviceId,
    );
  }
}
