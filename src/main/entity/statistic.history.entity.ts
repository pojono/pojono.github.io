import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statistic_history')
export class StatisticHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  trackId: number;

  @Column({ nullable: false })
  progress: number;

  @Column({ nullable: false })
  diff: number;
}
