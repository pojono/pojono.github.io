import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RubricToFastSupport } from '../entity/rubric.to.fast.support.entity';
import { RubricToFastSupportRepository } from '../repository/rubric.to.fast.support.repository';

@Injectable()
export class RubricToFastSupportService {
  constructor(
    @InjectRepository(RubricToFastSupportRepository)
    private rubricToFastSupportRepository: RubricToFastSupportRepository,
  ) {}

  async getByRubricId(rubricId: number): Promise<number[]> {
    const rubricToFastSupports: RubricToFastSupport[] = await this.rubricToFastSupportRepository.findByRubricId(
      rubricId,
    );
    return rubricToFastSupports.map(element => element.fastSupportId);
  }
}
