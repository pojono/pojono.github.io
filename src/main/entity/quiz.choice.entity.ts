import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_choice')
export class QuizChoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  answerId: number;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  quizId: number;

  @Column({ nullable: false, default: 0 })
  orderIndex: number;
}
