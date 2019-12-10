import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(phone: string): Promise<User> {
    const user = new User();
    user.phone = phone;
    await user.save();
    return user;
  }

  async updateSession(user: User, session: string): Promise<void> {
    user.session = session;
    await user.save();
  }

  async updateLastCode(user: User): Promise<void> {
    user.lastCode = new Date();
    await user.save();
  }
}
