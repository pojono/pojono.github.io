import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoAdviceRepository } from '../repository/video.advice.repository';
import { RubricToVideoAdviceService } from './rubric.to.video.advice.service';
import { VideoAdviceResponseDto } from '../response/dto/video.advice.response';
import { VideoAdviceWithStatsResponseDto } from '../response/dto/video.advice.with.stats.response';
import { CourseWithStatsResponseDto } from '../response/dto/course.with.stats.response';
import { CourseStatsResponseDto } from '../response/dto/course.stats.response';
import { VideoAdviceStatsResponseDto } from '../response/dto/video.advice.stats.response';
import { CourseToVideoAdviceService } from './course.to.video.advice.service';
import { Course } from '../entity/course.entity';
import { VideoAdvice } from '../entity/video.advice.entity';

@Injectable()
export class VideoAdviceService {
  constructor(
    @InjectRepository(VideoAdviceRepository)
    private videoAdviceRepository: VideoAdviceRepository,
    private rubricToVideoAdviceService: RubricToVideoAdviceService,
    private courseToVideoAdviceService: CourseToVideoAdviceService,
  ) {}

  async getById(id: number) {
    return this.videoAdviceRepository.findById(id);
  }

  async getByIds(ids: number[]) {
    return this.videoAdviceRepository.findByIds(ids);
  }

  async getByRubricId(id: number): Promise<VideoAdviceResponseDto[]> {
    const videoAdviceIds: number[] = await this.rubricToVideoAdviceService.getByRubricId(
      id,
    );

    return this.getByIds(videoAdviceIds);
  }

  async getForMainPage(): Promise<VideoAdviceResponseDto[]> {
    // TODO: get video advices for main page
    return [];
  }

  async getVideoAdviceStats(
    courseId: number,
  ): Promise<VideoAdviceStatsResponseDto> {
    return {
      // TODO: count stats
      showAfterLessonIndex: 0,
    };
  }

  async getVideoAdviceWithStatsById(
    courseId: number,
  ): Promise<VideoAdviceWithStatsResponseDto> {
    return {
      videoAdviceInfo: await this.getById(courseId),
      videoAdviceStats: await this.getVideoAdviceStats(courseId),
    };
  }

  /*
  async getVideoAdviceWithStats(
    videoAdvice: VideoAdvice,
  ): Promise<VideoAdviceWithStatsResponseDto> {
    return {
      videoAdviceInfo: videoAdvice,
      videoAdviceStats: await this.getVideoAdviceStats(videoAdvice.id),
    };
  }
  */

  async getVideoAdvicesWithStatsByCourseId(
    courseId: number,
  ): Promise<VideoAdviceWithStatsResponseDto[]> {
    const videoAdviceIds: number[] = await this.courseToVideoAdviceService.getByCourseId(
      courseId,
    );

    const videoAdvicesWithStats: VideoAdviceWithStatsResponseDto[] = [];

    for (const videoAdviceId of videoAdviceIds) {
      videoAdvicesWithStats.push(
        await this.getVideoAdviceWithStatsById(videoAdviceId),
      );
    }

    return videoAdvicesWithStats;
  }
}
