import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoAdviceRepository } from '../repository/video.advice.repository';
import { RubricToVideoAdviceService } from './rubric.to.video.advice.service';
import { VideoAdviceResponseDto } from '../response/dto/video.advice.response';
import { VideoAdviceWithStatsResponseDto } from '../response/dto/video.advice.with.stats.response';
import { VideoAdviceStatsResponseDto } from '../response/dto/video.advice.stats.response';
import { CourseToVideoAdviceService } from './course.to.video.advice.service';
import { CourseToVideoAdvice } from '../entity/course.to.video.advice.entity';

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
    return this.videoAdviceRepository.findForMainPage();
  }

  /*async getVideoAdviceStats(
    courseId: number,
    videoAdviceId: number,
  ): Promise<VideoAdviceStatsResponseDto> {
    const result: CourseToVideoAdvice = await this.courseToVideoAdviceService.getByCourseIdAndVideoAdviceId(
      courseId,
      videoAdviceId,
    );
    const showAfterLessonIndex: number = result
      ? result.showAfterLessonIndex
      : 0;
    return {
      showAfterLessonIndex,
    };
  }*/

  // async getVideoAdviceWithStatsById(
  async getVideoAdviceById(
    courseId: number,
    videoAdviceId: number,
  ): Promise<VideoAdviceResponseDto> {
    return this.getById(
      videoAdviceId,
    ); /* {
      videoAdviceInfo: await this.getById(videoAdviceId),
      videoAdviceStats: await this.getVideoAdviceStats(courseId, videoAdviceId),
    };*/
  }

  // async getVideoAdvicesWithStatsByCourseId(
  async getVideoAdvicesByCourseId(
    courseId: number,
  ): Promise<VideoAdviceResponseDto[]> {
    const videoAdviceIds: number[] = await this.courseToVideoAdviceService.getByCourseId(
      courseId,
    );

    const videoAdvices: VideoAdviceResponseDto[] = [];

    for (const videoAdviceId of videoAdviceIds) {
      videoAdvices.push(await this.getVideoAdviceById(courseId, videoAdviceId));
    }

    return videoAdvices;
  }
}
