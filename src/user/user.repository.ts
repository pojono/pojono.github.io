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

    return await user.save();
  }

  async countUsersWithActivityAfterDate(activityDate: Date) {
    return User.count({ where: { lastActivity: MoreThan(activityDate) } });
  }

  async updateLastActivity(user: User): Promise<void> {
    user.lastActivity = moment().toDate();
    await user.save();
  }
}
