import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RubricRepository } from '../repository/rubric.repository';
import { Rubric } from '../entity/rubric.entity';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { GetRubricByIdResponseDto } from '../response/get.rubric.by.id.response';
import { CourseWithStatsResponseDto } from '../response/dto/course.with.stats.response';
import { CourseService } from './course.service';
import { RubricToCourse } from '../entity/rubric.to.course.entity';
import { RubricToCourseRepository } from '../repository/rubric.to.course.repository';
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
