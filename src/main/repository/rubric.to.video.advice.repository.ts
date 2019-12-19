import { EntityRepository, Repository } from 'typeorm';
import { RubricToFastSupport } from '../entity/rubric.to.fast.support.entity';
import { RubricToVideoAdvice } from '../entity/rubric.to.video.advice.entity';

@EntityRepository(RubricToVideoAdvice)
export class RubricToVideoAdviceRepository extends Repository<
  RubricToVideoAdvice
> {
  async findByRubricId(rubricId: number): Promise<RubricToVideoAdvice[]> {
    return RubricToVideoAdvice.find({ where: { rubricId } });
  }
}
