import { EntityRepository, Repository } from 'typeorm';
import { RubricToCourse } from '../entity/rubric.to.course.entity';

@EntityRepository(RubricToCourse)
export class RubricRepository extends Repository<RubricToCourse> {
  async findAll(): Promise<RubricToCourse[]> {
    return RubricToCourse.find();
  }

  async findById(id: number): Promise<RubricToCourse | undefined> {
    return RubricToCourse.findOne(id);
  }
}
