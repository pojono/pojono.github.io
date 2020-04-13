import { EntityRepository, Repository } from 'typeorm';
import { Answer } from '../entity/answer.entity';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  async findAll(): Promise<Answer[]> {
    return Answer.find();
  }

  async findById(id: number): Promise<Answer | undefined> {
    return Answer.findOne(id);
  }

  /*
  async findByQuizId(quizId: number): Promise<Answer | undefined> {
    return Answer.findOne({
      where: {
        quizId,
      },
    });
  }
  */
}
