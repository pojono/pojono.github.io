import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoAdviceRepository } from '../repository/video.advice.repository';
import { RubricToVideoAdviceService } from './rubric.to.video.advice.service';
import { VideoAdviceResponseDto } from '../response/dto/video.advice.response';

@Injectable()
export class VideoAdviceService {
  constructor(
    @InjectRepository(VideoAdviceRepository)
    private videoAdviceRepository: VideoAdviceRepository,
    private rubricToVideoAdviceService: RubricToVideoAdviceService,
  ) {}

  async getByIds(ids: number[]) {
    return this.videoAdviceRepository.findByIds(ids);
  }

  async getByRubricId(id: number): Promise<VideoAdviceResponseDto[]> {
    const videoAdviceIds: number[] = await this.rubricToVideoAdviceService.getByRubricId(
      id,
    );

    return this.getByIds(videoAdviceIds);
  }
}
