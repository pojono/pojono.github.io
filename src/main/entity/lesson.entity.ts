import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  courseId: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  isLatest: boolean;

  @Column({ nullable: true })
  colour: string;

  @Column({ nullable: true })
  affirmation: string;

  @Column({ nullable: false })
  orderIndex: number;
}
