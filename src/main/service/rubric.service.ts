import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RubricRepository } from '../repository/rubric.repository';
import { Lesson } from '../entity/rubric.entity';
import { ErrorIf } from '../../lib/error.if';
import { OBJECT_NOT_FOUND } from '../../lib/errors';
import { GetRubricByIdResponseDto } from '../response/get.rubric.by.id.response';
import { CourseWithStatsResponseDto } from '../response/dto/course.with.stats.response';
import { CourseService } from './course.service';
import { FastSupportResponseDto } from '../response/dto/fast.support.response';
import { VideoAdviceResponseDto } from '../response/dto/video.advice.response';
import { FastSupportService } from './fast.support.service';
import { VideoAdviceService } from './video.advice.service';

@Injectable()
export class RubricService {
  constructor(
    @InjectRepository(RubricRepository)
    private rubricRepository: RubricRepository,
    private courseService: CourseService,
    private fastSupportService: FastSupportService,
    private videoAdviceService: VideoAdviceService,
  ) {}

  async getAllRubrics(): Promise<Lesson[]> {
    return this.rubricRepository.findAll();
  }

  async getRubricById(id: number): Promise<GetRubricByIdResponseDto> {
    const rubric: Lesson | undefined = await this.rubricRepository.findById(id);
    ErrorIf.notExist(rubric, OBJECT_NOT_FOUND);

    const course: CourseWithStatsResponseDto[] = await this.courseService.getByRubricId(
      id,
    );

    const fastSupport: FastSupportResponseDto[] = await this.fastSupportService.getByRubricId(
      id,
    );

    const videoAdvice: VideoAdviceResponseDto[] = await this.videoAdviceService.getByRubricId(
      id,
    );

    return {
      rubric,
      course,
      fastSupport,
      videoAdvice,
    };
  }
}
