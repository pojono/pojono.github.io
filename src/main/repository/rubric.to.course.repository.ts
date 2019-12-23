import { EntityRepository, Repository } from 'typeorm';
import { LessonToCourse } from '../entity/rubric.to.course.entity';

@EntityRepository(LessonToCourse)
export class RubricToCourseRepository extends Repository<LessonToCourse> {
  async findByRubricId(rubricId: number): Promise<LessonToCourse[]> {
    return LessonToCourse.find({ where: { rubricId } });
  }
}
