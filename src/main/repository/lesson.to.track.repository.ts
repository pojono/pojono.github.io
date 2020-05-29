import { EntityRepository, Repository } from 'typeorm';
import { LessonToTrack } from '../entity/lesson.to.track.entity';

@EntityRepository(LessonToTrack)
export class LessonToTrackRepository extends Repository<LessonToTrack> {
  async findByLessonId(lessonId: number): Promise<LessonToTrack[]> {
    return LessonToTrack.find({
      where: {
        lessonId,
      },
      order: {
        orderIndex: 'ASC',
      },
    });
  }
}
