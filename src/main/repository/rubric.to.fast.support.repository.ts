import { EntityRepository, Repository } from 'typeorm';
import { RubricToFastSupport } from '../entity/rubric.to.fast.support.entity';

@EntityRepository(RubricToFastSupport)
export class RubricToFastSupportRepository extends Repository<
  RubricToFastSupport
> {
  async findByRubricId(rubricId: number): Promise<RubricToFastSupport[]> {
    return RubricToFastSupport.find({
      where: {
        rubricId,
      },
      order: {
        orderIndex: 'ASC',
      },
    });
  }
}
