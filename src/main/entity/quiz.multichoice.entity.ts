import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_multichoice')
export class QuizMultichoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  choiceId: number;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  quizId: number;
}
