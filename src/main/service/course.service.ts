import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from '../repository/course.repository';
import { Course } from '../entity/course.entity';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { GetCourseByIdResponseDto } from '../response/get.course.by.id.response';
import { CourseWithStatsResponseDto } from '../response/dto/course.with.stats.response';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}

  async getCoursesWithStatsById(
    id: number,
  ): Promise<CourseWithStatsResponseDto[]> {
    const course: Course | undefined = await this.courseRepository.findById(id);
    ErrorIf.notExist(course, OBJECT_NOT_FOUND);

    return [
      {
        courseInfo: null,
        courseStats: null, // TODO
      },
    ];
  }
}
