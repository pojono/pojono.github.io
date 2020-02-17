import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as moment from 'moment';

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
  smsCode: string;

  @Column({ nullable: true })
  latestCourseId: number;

  @Column({ nullable: false })
  lastActivity: Date;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: false, default: 0 })
  pictureZoom: number;

  @Column({ nullable: false, default: 0 })
  currentStrike: number;

  @Column({ nullable: false, default: 0 })
  maxStrike: number;

  @Column({ nullable: false, default: 0 })
  sessionsCounter: number;

  @Column({ nullable: false, default: 0 })
  sessionsDuration: number;

  @Column({ nullable: false, default: 0 })
  utcDiff: number;

  @Column({ nullable: true })
  subscriptionPlatform: string;

  @Column({ nullable: true })
  subscriptionEnvironment: string;

  @Column({ nullable: true })
  subscriptionProductId: string;

  @Column({ nullable: true })
  subscriptionTransactionId: string;

  @Column({ nullable: true })
  subscriptionLatestReceipt: string;

  @Column({ nullable: true })
  subscriptionValidationResponse: string;

  @Column({ nullable: true })
  subscriptionStartDate: Date;

  @Column({ nullable: true })
  subscriptionEndDate: Date;

  @Column({ nullable: false, default: false })
  subscriptionIsCancelled: boolean;

  @Column({ nullable: true })
  subscriptionLastValidation: Date;

  @Column({ nullable: false, default: false })
  isPushesSkipped: boolean;

  @Column({ nullable: false, default: false })
  isPushesReminded: boolean;

  @Column({ nullable: true })
  pushesTime: string;

  @Column({ nullable: false, default: false })
  firstQuizFinished: boolean;

  public subscriptionIsActive(): boolean {
    const isNotActive =
      (moment(this.subscriptionEndDate).isValid() &&
        moment(this.subscriptionEndDate).isBefore(moment.utc())) ||
      this.subscriptionIsCancelled;
    return !!isNotActive;
  }
}
