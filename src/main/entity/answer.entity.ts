import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AnswerActionEnum } from '../answer.action.enum';

@Entity('answer')
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  answerAction: AnswerActionEnum;

  @Column({ nullable: false })
  quizId: number;
}
