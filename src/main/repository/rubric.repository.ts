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

  async countRubricsByIds(
    rubricIds: number[],
    isSleep: boolean,
  ): Promise<number> {
    const { count } = await this.createQueryBuilder('rubric')
      .select(`COUNT(rubric.id)`, 'count')
      .where('rubric.id IN (:...rubricIds)', { rubricIds })
      .andWhere('rubric.isSleep = :isSleep', { isSleep })
      .getRawOne();
    return Number(count);
  }
}
