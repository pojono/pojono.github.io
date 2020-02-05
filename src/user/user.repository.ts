import { EntityRepository, MoreThan, Repository } from 'typeorm';
import { User } from './user.entity';
import * as moment from 'moment';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(phone: string): Promise<User> {
    const user = new User();
    user.phone = phone;
    user.lastActivity = moment().toDate();
    await user.save();
    return user;
  }

  async updateSession(user: User, session: string): Promise<void> {
    user.session = session;
    await user.save();
  }

  async updateLastCode(user: User): Promise<void> {
    user.lastCode = moment().toDate();
    await user.save();
  }

  async countMaxStrike(): Promise<number> {
    // #STATS-4
    const query = this.createQueryBuilder('user');
    query.select('MAX(user.maxStrike)', 'max');
    const result = await query.getRawOne();
    return result.max;
  }

  async updateUser(user: User, userUpdateDto): Promise<User> {
    const dtoKeys: string[] = Object.keys(userUpdateDto);

    if (dtoKeys.includes('firstName')) {
      user.firstName = userUpdateDto.firstName;
    }

    if (dtoKeys.includes('lastName')) {
      user.lastName = userUpdateDto.lastName;
    }

    if (dtoKeys.includes('pushesTime')) {
      user.pushesTime = userUpdateDto.pushesTime;
    }

    if (dtoKeys.includes('firstQuizFinished')) {
      user.firstQuizFinished = userUpdateDto.firstQuizFinished;
    }

    if (dtoKeys.includes('picture')) {
      user.picture = userUpdateDto.picture;
    }

    return await user.save();
  }

  async countUsersWithActivityAfterDate(activityDate: Date) {
    return User.count({ where: { lastActivity: MoreThan(activityDate) } });
  }

  async updateLastActivity(user: User): Promise<void> {
    user.lastActivity = moment.utc().toDate();
    await user.save();
  }

  async updateLastSubscriptionValidation(user: User): Promise<void> {
    user.subscriptionLastValidation = moment.utc().toDate();
    await user.save();
  }

  async updateLatestCourse(user: User, courseId: number): Promise<void> {
    user.latestCourseId = courseId;
    await user.save();
  }

  async updateSessionsDuration(user, sessionsDuration): Promise<void> {
    user.sessionsDuration = sessionsDuration;
    await user.save();
  }

  async updateUtcDiff(user, utcDiff): Promise<User> {
    user.utcDiff = utcDiff;
    return user.save();
  }

  async incrementSession(user: User): Promise<void> {
    user.sessionsCounter = ++user.sessionsCounter;
    await user.save();
  }

  async incrementStrike(user: User): Promise<void> {
    user.currentStrike = ++user.currentStrike;

    if (user.currentStrike > user.maxStrike) {
      user.maxStrike = user.currentStrike;
    }
    await user.save();
  }

  async resetStrike(user: User): Promise<void> {
    user.currentStrike = 1;
    await user.save();
  }

  async updateSubscription(user: User, subscriptionDto): Promise<void> {
    user.subscriptionPlatform = subscriptionDto.appType;
    user.subscriptionEnvironment = subscriptionDto.environment;
    user.subscriptionProductId = subscriptionDto.productId;
    user.subscriptionTransactionId = subscriptionDto.origTxId;
    user.subscriptionLatestReceipt = subscriptionDto.latestReceipt;
    user.subscriptionValidationResponse = subscriptionDto.validationResponse;
    user.subscriptionStartDate = subscriptionDto.startDate;
    user.subscriptionEndDate = subscriptionDto.endDate;
    user.subscriptionIsCancelled = subscriptionDto.isCancelled;

    await user.save();
  }
}
