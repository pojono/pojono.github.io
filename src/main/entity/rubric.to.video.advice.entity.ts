import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rubric_to_video_advice')
export class RubricToVideoAdvice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  rubricId: number;

  @Column({ nullable: false })
  videoAdviceId: number;

  @Column({ nullable: true })
  orderIndex: number;
}
