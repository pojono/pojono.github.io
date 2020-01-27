import { EntityRepository, Repository } from 'typeorm';
import { QuizMessage } from '../entity/quiz.message.entity';

@EntityRepository(QuizMessage)
export class QuizMessageRepository extends Repository<QuizMessage> {
  async findAll(): Promise<QuizMessage[]> {
    return QuizMessage.find();
  }

  async findById(id: number): Promise<QuizMessage | undefined> {
    return QuizMessage.findOne(id);
  }

  async findByQuizId(quizId: number): Promise<QuizMessage[]> {
    return QuizMessage.find({
      where: {
        quizId,
      },
      order: {
        orderIndex: 'ASC',
      },
    });
  }
}
