import { EntityRepository, Repository } from 'typeorm';
import { VideoAdvice } from '../entity/video.advice.entity';

@EntityRepository(VideoAdvice)
export class VideoAdviceRepository extends Repository<VideoAdvice> {
  async findAll(): Promise<VideoAdvice[]> {
    return VideoAdvice.find();
  }

  async findById(id: number): Promise<VideoAdvice | undefined> {
    return VideoAdvice.findOne(id);
  }

  async findForMainPage(): Promise<VideoAdvice[]> {
    return VideoAdvice.find({
      where: {
        forMainPage: true,
      },
      order: {
        orderIndex: 'ASC',
      },
    });
  }
}
