import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statistic_hour')
export class StatisticHour extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false, default: 0 })
  duration: number;

  @Column({ nullable: false, default: 0 })
  durationSleep: number;
}
