import { EntityRepository, Repository } from 'typeorm';
import { QuizMultichoice } from '../entity/quiz.multichoice.entity';

@EntityRepository(QuizMultichoice)
export class QuizMultichoiceRepository extends Repository<QuizMultichoice> {
  async findAll(): Promise<QuizMultichoice[]> {
    return QuizMultichoice.find();
  }

  async findById(id: number): Promise<QuizMultichoice | undefined> {
    return QuizMultichoice.findOne(id);
  }

  async findByQuizId(quizId: number): Promise<QuizMultichoice[]> {
    return QuizMultichoice.find({
      where: {
        quizId,
      },
    });
  }
}
