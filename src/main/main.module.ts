import { Module } from '@nestjs/common';
import { MainController } from './controller/main.controller';
import { MainService } from './main.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './controller/course.controller';
import { RubricController } from './controller/rubric.controller';
import { LessonController } from './controller/lesson.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [
    MainController,
    CourseController,
    RubricController,
    LessonController,
  ],
  providers: [MainService],
})
export class MainModule {}
