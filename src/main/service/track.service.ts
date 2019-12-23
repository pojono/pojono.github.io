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
import { TrackResponseDto } from '../response/dto/track.response';
import { TrackRepository } from '../repository/track.repository';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackRepository)
    private trackRepository: TrackRepository,
  ) {}

  async getByIds(ids: number[]) {
    return this.trackRepository.findByIds(ids);
  }
}
