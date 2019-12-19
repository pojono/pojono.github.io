import { EntityRepository, Repository } from 'typeorm';
import { RubricToCourse } from '../entity/rubric.to.course.entity';

@EntityRepository(RubricToCourse)
export class RubricToCourseRepository extends Repository<RubricToCourse> {
  async findByRubricId(rubricId: number): Promise<RubricToCourse[]> {
    return RubricToCourse.find({ where: { rubricId } });
  }
}