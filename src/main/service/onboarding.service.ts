import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OnboardingRepository } from '../repository/onboarding.repository';
import { GetOnboardingResponseDto } from '../response/get.onboarding.response';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(OnboardingRepository)
    private onboardingRepository: OnboardingRepository,
  ) {}

  async getOnboarding(quizId: number): Promise<GetOnboardingResponseDto> {
    return { onboarding: await this.onboardingRepository.findByQuizId(quizId) };
  }
}
