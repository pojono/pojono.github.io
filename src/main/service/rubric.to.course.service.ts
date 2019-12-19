import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RubricRepository } from '../repository/rubric.repository';
import { Rubric } from '../entity/rubric.entity';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { GetRubricByIdResponseDto } from '../response/get.rubric.by.id.response';
import { CourseWithStatsResponseDto } from '../response/dto/course.with.stats.response';
import { CourseService } from './course.service';
import { RubricToCourse } from '../entity/rubric.to.course.entity';
import { RubricToCourseRepository } from '../repository/rubric.to.course.repository';

@Injectable()
export class RubricToCourseService {
  constructor(
    @InjectRepository(RubricToCourseRepository)
    private rubricToCourseRepository: RubricToCourseRepository,
  ) {}

  async getByRubricId(rubricId: number): Promise<number[]> {
    const rubricToCourses: RubricToCourse[] = await this.rubricToCourseRepository.findByRubricId(
      rubricId,
    );
    return rubricToCourses.map(element => element.courseId);
  }
}
