import { Module } from '@nestjs/common';
import { MainController } from './controller/main.controller';
import { MainService } from './main.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './controller/course.controller';
import { RubricController } from './controller/rubric.controller';
import { LessonController } from './controller/lesson.controller';
import { RubricService } from './service/rubric.service';
import { RubricRepository } from './repository/rubric.repository';
import { CourseService } from './service/course.service';
import { FastSupportService } from './service/fast.support.service';
import { RubricToCourseService } from './service/rubric.to.course.service';
import { RubricToFastSupportService } from './service/rubric.to.fast.support.service';
import { RubricToVideoAdviceService } from './service/rubric.to.video.advice.service';
import { VideoAdviceService } from './service/video.advice.service';
import { CourseRepository } from './repository/course.repository';
import { FastSupportRepository } from './repository/fast.support.repository';
import { RubricToCourseRepository } from './repository/rubric.to.course.repository';
import { RubricToFastSupportRepository } from './repository/rubric.to.fast.support.repository';
import { RubricToVideoAdviceRepository } from './repository/rubric.to.video.advice.repository';
import { VideoAdviceRepository } from './repository/video.advice.repository';
import { LessonRepository } from './repository/lesson.repository';
import { LessonToTrackRepository } from './repository/lesson.to.track.repository';
import { TrackRepository } from './repository/track.repository';
import { LessonService } from './service/lesson.service';
import { LessonToTrackService } from './service/lesson.to.track.service';
import { TrackService } from './service/track.service';
import { ChallengeRepository } from './repository/challenge.repository';
import { ChallengeService } from './service/challenge.service';
import { CourseToVideoAdviceService } from './service/course.to.video.advice.service';
import { CourseToVideoAdviceRepository } from './repository/course.to.video.advice.repository';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { JwtStrategy } from '../user/jwt.strategy';
import { PhotoService } from './service/photo.service';
import { PhotoRepository } from './repository/photo.repository';
import { PhotoController } from './controller/photo.controller';
import { StatisticService } from './service/statistic.service';
import { StatisticController } from './controller/statistic.controller';
import { FastSupportController } from './controller/fast.support.controller';
import { StatisticHourService } from './service/statistic.hour.service';
import { StatisticHourRepository } from './repository/statistic.hour.repository';
import { StatisticCourseService } from './service/statistic.course.service';
import { StatisticLessonService } from './service/statistic.lesson.service';
import { StatisticTrackService } from './service/statistic.track.service';
import { StatisticCourseRepository } from './repository/statistic.course.repository';
import { StatisticLessonRepository } from './repository/statistic.lesson.repository';
import { StatisticTrackRepository } from './repository/statistic.track.repository';
import { EventController } from './controller/event.controller';
import { EventService } from './service/event.service';
import { EventRepository } from './repository/event.repository';
import { QuizRepository } from './repository/quiz.repository';
import { QuizController } from './controller/quiz.controller';
import { QuizService } from './service/quiz.service';
import { QuizMessageRepository } from './repository/quiz.message.repository';
import { QuizChoiceRepository } from './repository/quiz.choice.repository';
import { QuizMultichoiceRepository } from './repository/quiz.multichoice.repository';
import { OnboardingRepository } from './repository/onboarding.repository';
import { OnboardingController } from './controller/onboarding.controller';
import { OnboardingService } from './service/onboarding.service';
import { AnswerRepository } from './repository/answer.repository';
import { StatisticHistoryRepository } from './repository/statistic.history.repository';
import { StatisticHistoryService } from './service/statistic.history.service';
import { EventHistoryRepository } from './repository/event.history.repository';
import { EventHistoryService } from './service/event.history.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([
      CourseRepository,
      FastSupportRepository,
      RubricRepository,
      RubricToCourseRepository,
      RubricToFastSupportRepository,
      RubricToVideoAdviceRepository,
      VideoAdviceRepository,
      LessonRepository,
      LessonToTrackRepository,
      TrackRepository,
      ChallengeRepository,
      CourseToVideoAdviceRepository,
      UserRepository,
      PhotoRepository,
      StatisticHourRepository,
      StatisticCourseRepository,
      StatisticLessonRepository,
      StatisticTrackRepository,
      StatisticHistoryRepository,
      EventRepository,
      QuizRepository,
      QuizMessageRepository,
      QuizChoiceRepository,
      QuizMultichoiceRepository,
      OnboardingRepository,
      AnswerRepository,
      EventHistoryRepository,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || config.get('jwt.secret'),
      signOptions: {
        expiresIn: config.get('jwt.expiresIn'),
      },
    }),
  ],
  controllers: [
    MainController,
    CourseController,
    RubricController,
    LessonController,
    PhotoController,
    StatisticController,
    FastSupportController,
    EventController,
    QuizController,
    OnboardingController,
  ],
  providers: [
    MainService,
    CourseService,
    FastSupportService,
    RubricService,
    RubricToCourseService,
    RubricToFastSupportService,
    RubricToVideoAdviceService,
    VideoAdviceService,
    LessonService,
    LessonToTrackService,
    PhotoService,
    TrackService,
    ChallengeService,
    CourseToVideoAdviceService,
    UserService,
    JwtStrategy,
    StatisticLessonService,
    StatisticService,
    StatisticHourService,
    StatisticCourseService,
    StatisticTrackService,
    StatisticHistoryService,
    EventService,
    QuizService,
    OnboardingService,
    EventHistoryService,
  ],
})
export class MainModule {}
