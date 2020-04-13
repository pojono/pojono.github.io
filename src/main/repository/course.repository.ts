import { EntityRepository, Repository, MoreThan } from 'typeorm';
import { Course } from '../entity/course.entity';
import * as moment from 'moment';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  async findAll(): Promise<Course[]> {
    return Course.find();
  }

  async findById(id: number): Promise<Course | undefined> {
    return Course.findOne(id);
  }

  async findBeginnerCourse(): Promise<Course> {
    return Course.findOne({ where: { beginnerCourse: true } });
  }

  async findBestCourseIds(): Promise<number[]> {
    const courses: Course[] = await Course.find({
      where: { theBestForYou: true },
    });
    return courses.map(course => course.id);
  }

  async findAnnouncementCoursesIds(): Promise<number[]> {
    const courses: Course[] = await Course.find({
      where: {
        forAnnounce: true,
        startDate: MoreThan(moment.utc().toDate()),
      },
    });
    return courses.map(course => course.id);
  }
}
