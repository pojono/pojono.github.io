import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rubric_to_course')
export class RubricToCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  rubricId: number;

  @Column({ nullable: false })
  courseId: number;

  @Column({ nullable: true })
  orderIndex: number;
}
