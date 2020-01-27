import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityEnum } from '../enitity.enum';

@Entity('quiz_message')
export class QuizMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  entity: EntityEnum;

  @Column({ nullable: true })
  entityId: number;

  @Column({ nullable: false })
  quizId: number;

  @Column({ nullable: false, default: 0 })
  orderIndex: number;
}
