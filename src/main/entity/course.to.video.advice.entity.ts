import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course_to_video_advice')
export class CourseToVideoAdvice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  courseId: number;

  @Column({ nullable: false })
  videoAdviceId: number;

  @Column({ nullable: false })
  showAfterLessonIndex: number;

  @Column({ nullable: true })
  orderIndex: number;
}
