import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lesson_to_track')
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
