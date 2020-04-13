import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statistic_track')
export class StatisticTrack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  trackId: number;

  @Column({ nullable: false, default: 0 })
  lastProgress: number;

  @Column({ nullable: false, default: 0 })
  maxProgress: number;
}
