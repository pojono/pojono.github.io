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

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([RubricRepository]),
  ],
  controllers: [
    MainController,
    CourseController,
    RubricController,
    LessonController,
  ],
  providers: [MainService, RubricService],
})
export class MainModule {}
