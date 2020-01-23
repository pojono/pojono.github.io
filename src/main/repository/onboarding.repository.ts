import { EntityRepository, Repository } from 'typeorm';
import { Onboarding } from '../entity/onboarding.entity';

@EntityRepository(Onboarding)
export class OnboardingRepository extends Repository<Onboarding> {
  async findAll(): Promise<Onboarding[]> {
    return Onboarding.find();
  }

  async findById(id: number): Promise<Onboarding | undefined> {
    return Onboarding.findOne(id);
  }

  async findByQuizId(quizId: number): Promise<Onboarding[]> {
    return Onboarding.find({
      where: {
        quizId,
      },
    });
  }
}