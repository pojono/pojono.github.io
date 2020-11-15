import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as moment from 'moment';

@Entity()
// @Unique(['phone'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
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

  @Column({ nullable: false, default: false })
  ratingQuizFinished: boolean;

  @Column({ nullable: false, default: false })
  isTestUser: boolean;

  @Column({ nullable: true })
  promocode: string;

  @Column({ nullable: true })
  promocodeDate: Date;

  @Column({ nullable: true })
  latestNewsQuizId: number;

  public subscriptionIsActive(): boolean {
    return (
      moment(this.subscriptionEndDate).isValid() &&
      moment(this.subscriptionEndDate).isAfter(moment.utc())
    );
  }
}
