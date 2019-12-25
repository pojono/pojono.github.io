import { EntityRepository, Repository } from 'typeorm';
import { FastSupport } from '../entity/fast.support.entity';

@EntityRepository(FastSupport)
export class FastSupportRepository extends Repository<FastSupport> {
  async findAll(): Promise<FastSupport[]> {
    return FastSupport.find();
  }

  async findById(id: number): Promise<FastSupport | undefined> {
    return FastSupport.findOne(id);
  }

  async findForMainPage(): Promise<FastSupport[]> {
    return FastSupport.find({ where: { forMainPage: true } });
  }
}
