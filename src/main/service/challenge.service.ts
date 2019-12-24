import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengeResponseDto } from '../response/dto/challenge.response';
import { ChallengeRepository } from '../repository/challenge.repository';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(ChallengeRepository)
    private challengeRepository: ChallengeRepository,
  ) {}

  async getChallengeByCourseId(
    courseId: number,
  ): Promise<ChallengeResponseDto> {
    return this.challengeRepository.findOneByCourseId(courseId);
  }
}
