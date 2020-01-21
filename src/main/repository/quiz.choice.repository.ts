import { EntityRepository, Repository } from 'typeorm';
import { QuizChoice } from '../entity/quiz.choice.entity';

@EntityRepository(QuizChoice)
export class QuizChoiceRepository extends Repository<QuizChoice> {
  async findAll(): Promise<QuizChoice[]> {
    return QuizChoice.find();
  }

  async findById(id: number): Promise<QuizChoice | undefined> {
    return QuizChoice.findOne(id);
  }

  async findByQuizId(quizId: number): Promise<QuizChoice[]> {
    return QuizChoice.find({
      where: {
        quizId,
      },
    });
  }
}
