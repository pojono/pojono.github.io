import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_history')
export class EventHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  event: string;

  @Column({ nullable: true })
  entityId: number;

  @Column({ nullable: false })
  datetime: Date;
}
