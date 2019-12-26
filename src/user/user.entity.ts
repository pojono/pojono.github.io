import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['phone'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  session: string;

  @Column({ nullable: true })
  lastCode: Date;

  @Column({ nullable: true })
  latestCourseId: number;

  @Column({ nullable: false })
  lastActivity: Date;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: false, default: 0 })
  currentStrike: number;

  @Column({ nullable: false, default: 0 })
  maxStrike: number;

  @Column({ nullable: false, default: 0 })
  sessionsCounter: number;

  @Column({ nullable: false, default: 0 })
  sessionsDuration: number;
}
