import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from '../repository/course.repository';
import { Course } from '../entity/course.entity';
import { CourseWithStatsResponseDto } from '../response/dto/course.with.stats.response';
import { RubricToCourseService } from './rubric.to.course.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
    private rubricToCourseService: RubricToCourseService,
  ) {}

  async getByIds(ids: number[]) {
    return this.courseRepository.findByIds(ids);
  }

  async getByRubricId(id: number): Promise<CourseWithStatsResponseDto[]> {
    const courseIds: number[] = await this.rubricToCourseService.getByRubricId(
      id,
    );

    const courses: Course[] = await this.getByIds(courseIds);

    const result: CourseWithStatsResponseDto[] = [];

    for (const course of courses) {
      result.push({
        courseInfo: course,
        courseStats: null,
      });
    }

    return result;
  }
}
