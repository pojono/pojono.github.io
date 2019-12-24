import { EntityRepository, Repository } from 'typeorm';
import { Challenge } from '../entity/challenge.entity';

@EntityRepository(Challenge)
export class ChallengeRepository extends Repository<Challenge> {
  async findAll(): Promise<Challenge[]> {
    return Challenge.find();
  }

  async findByCourseId(courseId: number): Promise<Challenge[]> {
    return Challenge.find({ where: { courseId } });
  }

  async findOneByCourseId(courseId: number): Promise<Challenge> {
    return Challenge.findOne({ where: { courseId } });
  }
}
