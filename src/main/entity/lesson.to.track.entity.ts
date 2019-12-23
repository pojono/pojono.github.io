import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LessonToTrack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  lessonId: number;

  @Column({ nullable: false })
  trackId: number;

  @Column({ nullable: true })
  orderIndex: number;
}
