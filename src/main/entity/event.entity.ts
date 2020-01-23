import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EventEnum } from '../event.enum';

@Entity('event')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  event: EventEnum;

  @Column({ nullable: true })
  value: number;

  @Column({ nullable: false })
  quizId: number;
}
