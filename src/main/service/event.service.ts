import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from '../repository/event.repository';
import { EventRequestDto } from '../dto/event.request.dto';
import { Event } from '../entity/event.entity';
import { EventEnum } from '../event.enum';
import { User } from '../../user/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  async getEvent(
    user: User,
    eventRequestDto: EventRequestDto,
  ): Promise<number | null> {
    const event: Event | undefined = await this.eventRepository.findEvent(
      eventRequestDto,
    );

    if (event) {
      if (
        event.event === EventEnum.AUTHORIZATION_FINISHED &&
        user.firstQuizFinished
      ) {
        return 1; // TODO: quizId which GOTO HOME
      }
      if (
        event.event === EventEnum.AUTHORIZATION_FINISHED &&
        !user.firstQuizFinished
      ) {
        return 2; // TODO: quizId which GOTO FIRST QUIZ
      }
      return event.quizId;
    } else {
      return null;
    }
  }
}
