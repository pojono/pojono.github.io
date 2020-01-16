import { EntityRepository, Repository } from 'typeorm';
import { Quiz } from '../entity/quiz.entity';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {
  async findAll(): Promise<Quiz[]> {
    return Quiz.find();
  }

  async findById(id: number): Promise<Quiz | undefined> {
    return Quiz.findOne(id);
  }
}
