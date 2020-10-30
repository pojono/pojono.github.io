import { EntityRepository, Repository } from 'typeorm';
import { Quiz } from '../entity/quiz.entity';
import { EventDescriptionEnum } from '../event.description.enum';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {
  async findAll(): Promise<Quiz[]> {
    return Quiz.find();
  }

  async findById(id: number): Promise<Quiz | undefined> {
    return Quiz.findOne(id);
  }

  async findByEventDescription(
    eventDescription: EventDescriptionEnum,
  ): Promise<Quiz | undefined> {
    return Quiz.findOne({
      where: { eventDescription },
      order: {
        id: 'DESC',
      },
    });
  }
}
