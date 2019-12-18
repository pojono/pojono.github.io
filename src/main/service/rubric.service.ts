import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RubricRepository } from '../repository/rubric.repository';
import { Rubric } from '../entity/rubric.entity';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { GetRubricByIdResponseDto } from '../response/get.rubric.by.id.response';

@Injectable()
export class RubricService {
  constructor(
    @InjectRepository(RubricRepository)
    private rubricRepository: RubricRepository,
  ) {}

  async getAllRubrics(): Promise<Rubric[]> {
    return this.rubricRepository.findAll();
  }

  async getRubricById(id: number): Promise<GetRubricByIdResponseDto> {
    const rubric: Rubric | undefined = await this.rubricRepository.findById(id);
    ErrorIf.notExist(rubric, OBJECT_NOT_FOUND);

    return {
      rubric,
      course: [], // TODO
      fastSupport: [], // TODO
      videoAdvice: [], // TODO
    };
  }
}
