import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  event: string;

  @Column({ nullable: true })
  value: number;

  @Column({ nullable: true })
  quizId: number;
}
