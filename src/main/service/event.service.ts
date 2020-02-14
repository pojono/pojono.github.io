import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from '../repository/event.repository';
import { EventRequestDto } from '../dto/event.request.dto';
import { Event } from '../entity/event.entity';
import { EventEnum } from '../event.enum';
import { User } from '../../user/user.entity';
import { StatisticLessonService } from './statistic.lesson.service';
import { QuizService } from './quiz.service';
import { EventDescriptionEnum } from '../event.description.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,

    private statisticLessonService: StatisticLessonService,
    private quizService: QuizService,
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
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_SUBSCRIPTION,
          );
          if (quiz) {
            return quiz.id;
          }
        }
        if (!user.subscriptionIsNotActive() && user.firstQuizFinished) {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_HOME,
          );
          if (quiz) {
            return quiz.id;
          }
        }
        if (user.subscriptionIsNotActive() && !user.firstQuizFinished) {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_FIRST_QUIZ,
          );
          if (quiz) {
            return quiz.id;
          }
        }
        if (!user.subscriptionIsNotActive() && !user.firstQuizFinished) {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_HOME,
          );
          if (quiz) {
            return quiz.id;
          }
        }
      }

      if (event.event === EventEnum.LESSON_FINISHED) {
        const finishedLessons: number = await this.statisticLessonService.countFinishedByUserId(
          user.id,
        );
        if (finishedLessons === 1) {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_PUSHES,
          );
          if (quiz) {
            return quiz.id;
          }
        }
      }
    }

    return null;
  }
}
