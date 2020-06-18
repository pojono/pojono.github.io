import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course')
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  video: string;

  @Column({ nullable: true })
  durationOfLessons: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: false })
  theBestForYou: boolean;

  @Column({ nullable: false })
  forAnnounce: boolean;

  @Column({ nullable: false })
  beginnerCourse: boolean;

  @Column({ nullable: true })
  colour: string;

  @Column({ nullable: true })
  musicCourse: boolean;

  @Column({ nullable: true })
  recommendationId: number;
}
