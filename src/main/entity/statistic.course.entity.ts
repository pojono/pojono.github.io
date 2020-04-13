import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statistic_course')
export class StatisticCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  courseId: number;

  @Column({ nullable: false, default: false })
  isFinished: boolean;
}
