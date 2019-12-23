import { EntityRepository, Repository } from 'typeorm';
import { Lesson } from '../entity/lesson.entity';

@EntityRepository(Lesson)
export class LessonRepository extends Repository<Lesson> {
  async findAll(): Promise<Lesson[]> {
    return Lesson.find();
  }

  async findById(id: number): Promise<Lesson | undefined> {
    return Lesson.findOne(id);
  }
}
