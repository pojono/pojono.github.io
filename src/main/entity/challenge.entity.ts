import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('challenge')
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  courseId: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: false })
  showAfterLessonIndex: number;

  @Column({ nullable: true })
  colour: string;
}
