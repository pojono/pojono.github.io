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
import { EventHistoryService } from './event.history.service';
import { UserService } from '../../user/user.service';
import { isTrue } from '../../lib/is.true';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,

    private userService: UserService,
    private eventHistoryService: EventHistoryService,
    private statisticLessonService: StatisticLessonService,
    private quizService: QuizService,
  ) {}

  async getEvent(
    user: User,
    eventRequestDto: EventRequestDto,
  ): Promise<number | null> {
    await this.eventHistoryService.createEvent(
      user.id,
      eventRequestDto.event,
      eventRequestDto.id,
    );

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
      const latestNewsQuiz = await this.quizService.getByEventDescription(
        EventDescriptionEnum.GO_TO_NEWS,
      );

      if (event.event === EventEnum.AUTHORIZATION_FINISHED) {
        if (!user.subscriptionIsActive() && user.firstQuizFinished) {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_SUBSCRIPTION,
          );
          if (quiz) {
            return quiz.id;
          }
        }
        if (user.subscriptionIsActive() && user.firstQuizFinished) {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_HOME,
          );
          if (latestNewsQuiz && user.latestNewsQuizId !== latestNewsQuiz.id) {
            await this.userService.newsQuizFinished(user, latestNewsQuiz.id);
            return latestNewsQuiz.id;
          } else if (quiz) {
            return quiz.id;
          }
        }
        if (!user.subscriptionIsActive() && !user.firstQuizFinished) {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_FIRST_QUIZ,
          );
          if (quiz) {
            return quiz.id;
          }
        }
        if (user.subscriptionIsActive() && !user.firstQuizFinished) {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_HOME,
          );
          if (latestNewsQuiz && user.latestNewsQuizId !== latestNewsQuiz.id) {
            await this.userService.newsQuizFinished(user, latestNewsQuiz.id);
            return latestNewsQuiz.id;
          } else if (quiz) {
            return quiz.id;
          }
        }
      }

      if (event.event === EventEnum.LESSON_FINISHED) {
        const finishedLessons: number = await this.statisticLessonService.countFinishedByUserId(
          user.id,
        );
        if (finishedLessons === 1 && !user.pushesTime) {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_PUSHES,
          );
          if (quiz) {
            return quiz.id;
          }
        } else if (
          finishedLessons > 1 &&
          !user.ratingQuizFinished &&
          isTrue(eventRequestDto.appHasRating)
        ) {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_RATING_QUIZ,
          );
          if (quiz) {
            // await this.userService.ratingQuizFinished(user);
            return quiz.id;
          }
        } else {
          const quiz = await this.quizService.getByEventDescription(
            EventDescriptionEnum.GO_TO_BACK,
          );
          if (quiz) {
            return quiz.id;
          }
        }
      }

      if (event.event === EventEnum.COURSE_FINISHED) {
        return event.quizId;
      }

      if (event.event === EventEnum.APP_OPENED) {
        /*
        const quiz = await this.quizService.getByEventDescription(
          EventDescriptionEnum.GO_TO_NEWS,
        );
        if (quiz) {
          return quiz.id;
        }
        */
      }
    }

    return null;
  }
}
