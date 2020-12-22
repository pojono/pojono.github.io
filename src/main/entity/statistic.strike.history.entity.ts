import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statistic_strike_history')
export class StatisticStrikeHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  trackId: number;

  @Column({ nullable: false })
  from: number;

  @Column({ nullable: false })
  to: number;

  @Column({ nullable: false, default: 0 })
  utcDiff: number;

  @Column({ nullable: false })
  datetime: Date;
}
