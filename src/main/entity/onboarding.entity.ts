import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('onboarding')
export class Onboarding extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  quizId: number;

  @Column({ nullable: false, default: false })
  forStart: boolean;

  @Column({ nullable: false, default: 0 })
  orderIndex: number;
}
