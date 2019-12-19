import { EntityRepository, Repository } from 'typeorm';
import { Course } from '../entity/course.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  async findAll(): Promise<Course[]> {
    return Course.find();
  }

  async findById(id: number): Promise<Course | undefined> {
    return Course.findOne(id);
  }
}
