import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from '../repository/event.repository';
import { EventRequestDto } from '../dto/event.request.dto';
import { Event } from '../entity/event.entity';
import { EventEnum } from '../event.enum';
import { User } from '../../user/user.entity';
import { StatisticLessonService } from './statistic.lesson.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,

    private statisticLessonService: StatisticLessonService,
  ) {}

  async getEvent(
    user: User,
    eventRequestDto: EventRequestDto,
  ): Promise<number | null> {
    const event: Event | undefined = await this.eventRepository.findEvent(
      eventRequestDto,
    );

    // нет подписки
    // первый квиз закончен
    // ==> 7 на экран подписки (если выйти из приложения на экране с подпиской или если подписка истечет или будет отменена)

    // есть подписка
    // первый квиз закончен
    // ==> 1 на главный экран (стандартное поведение у пользователя который оплатил и пользуется)

    // нет подписки
    // первый квиз НЕ закончен
    // ==> 2 на квиз (первый запуск приложения или пользователь вышел посреди квиза)

    // есть подписка
    // первый квиз НЕ закончен
    // ==> такого быть не должно. Но пока отправим 1

    if (event) {
      if (event.event === EventEnum.AUTHORIZATION_FINISHED) {
        if (user.subscriptionIsNotActive() && user.firstQuizFinished) {
          return 7; // TODO: hard code
        }
        if (!user.subscriptionIsNotActive() && user.firstQuizFinished) {
          return 1; // TODO: hard code
        }
        if (user.subscriptionIsNotActive() && !user.firstQuizFinished) {
          return 2; // TODO: hard code
        }
        if (!user.subscriptionIsNotActive() && !user.firstQuizFinished) {
          return 1; // IMPOSSIBLE
        }
      }

      if (event.event === EventEnum.LESSON_FINISHED) {
        const finishedLessons: number = await this.statisticLessonService.countFinishedByUserId(
          user.id,
        );
        if (finishedLessons === 1) {
          return 8;
        }
      }
    }

    return null;
  }
}
