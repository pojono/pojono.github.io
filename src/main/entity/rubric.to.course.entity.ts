import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LessonToCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  rubricId: number;

  @Column({ nullable: false })
  courseId: number;

  @Column({ nullable: true })
  orderIndex: number;
}
