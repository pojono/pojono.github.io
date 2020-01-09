import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statistic_lesson')
export class StatisticLesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  lessonId: number;

  @Column({ nullable: false })
  trackId: number;

  @Column({ nullable: false })
  courseId: number;

  @Column({ nullable: false, default: 0 })
  progress: number;
}
