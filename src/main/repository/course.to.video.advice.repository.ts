import { EntityRepository, Repository } from 'typeorm';
import { CourseToVideoAdvice } from '../entity/course.to.video.advice.entity';

@EntityRepository(CourseToVideoAdvice)
export class CourseToVideoAdviceRepository extends Repository<
  CourseToVideoAdvice
> {
  async findByCourseId(courseId: number): Promise<CourseToVideoAdvice[]> {
    return CourseToVideoAdvice.find({ where: { courseId } });
  }

  async findByCourseIdAndVideoAdviceId(
    courseId: number,
    videoAdviceId: number,
  ): Promise<CourseToVideoAdvice | undefined> {
    return CourseToVideoAdvice.findOne({
      where: {
        courseId,
        videoAdviceId,
      },
    });
  }
}
