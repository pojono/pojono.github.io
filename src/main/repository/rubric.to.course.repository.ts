import { EntityRepository, Repository } from 'typeorm';
import { RubricToCourse } from '../entity/rubric.to.course.entity';

@EntityRepository(RubricToCourse)
export class RubricToCourseRepository extends Repository<RubricToCourse> {
  async findByRubricId(rubricId: number): Promise<RubricToCourse[]> {
    return RubricToCourse.find({
      where: { rubricId },
      order: { orderIndex: 'ASC' },
    });
  }

  async findRubricIdsByCourseId(courseId: number): Promise<number[]> {
    const rubricToCourses: RubricToCourse[] = await RubricToCourse.find({
      where: { courseId },
    });
    return rubricToCourses.map(rubricToCourse => rubricToCourse.rubricId);
  }
}
