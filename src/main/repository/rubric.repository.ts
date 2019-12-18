import { EntityRepository, Repository } from 'typeorm';
import { Rubric } from '../entity/rubric.entity';

@EntityRepository(Rubric)
export class RubricRepository extends Repository<Rubric> {
  async findAll(): Promise<Rubric[]> {
    return Rubric.find();
  }

  async findById(id: number): Promise<Rubric | undefined> {
    return Rubric.findOne(id);
  }
}
