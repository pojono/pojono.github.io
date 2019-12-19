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
    ]),
  ],
  controllers: [
    MainController,
    CourseController,
    RubricController,
    LessonController,
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
  ],
})
export class MainModule {}
