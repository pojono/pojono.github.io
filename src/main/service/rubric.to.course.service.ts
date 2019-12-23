import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
