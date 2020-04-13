import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RubricToVideoAdvice } from '../entity/rubric.to.video.advice.entity';
import { RubricToVideoAdviceRepository } from '../repository/rubric.to.video.advice.repository';

@Injectable()
export class RubricToVideoAdviceService {
  constructor(
    @InjectRepository(RubricToVideoAdviceRepository)
    private rubricToVideoAdviceRepository: RubricToVideoAdviceRepository,
  ) {}

  async getByRubricId(rubricId: number): Promise<number[]> {
    const rubricToVideoAdvices: RubricToVideoAdvice[] = await this.rubricToVideoAdviceRepository.findByRubricId(
      rubricId,
    );
    return rubricToVideoAdvices.map(element => element.videoAdviceId);
  }
}
