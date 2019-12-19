import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from '../repository/course.repository';
import { Course } from '../entity/course.entity';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { GetCourseByIdResponseDto } from '../response/get.course.by.id.response';
import { CourseWithStatsResponseDto } from '../response/dto/course.with.stats.response';
import { RubricToCourseRepository } from '../repository/rubric.to.course.repository';
import { RubricToCourseService } from './rubric.to.course.service';
import { FastSupportRepository } from '../repository/fast.support.repository';
import { RubricToFastSupportService } from './rubric.to.fast.support.service';
import { FastSupport } from '../entity/fast.support.entity';
import { FastSupportResponseDto } from '../response/dto/fast.support.response';

@Injectable()
export class FastSupportService {
  constructor(
    @InjectRepository(FastSupportRepository)
    private fastSupportRepository: FastSupportRepository,
    private rubricToFastSupportService: RubricToFastSupportService,
  ) {}

  async getByIds(ids: number[]) {
    return this.fastSupportRepository.findByIds(ids);
  }

  async getByRubricId(id: number): Promise<FastSupportResponseDto[]> {
    const fastSupportIds: number[] = await this.rubricToFastSupportService.getByRubricId(
      id,
    );

    return this.getByIds(fastSupportIds);
  }
}
