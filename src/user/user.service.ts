import { Injectable, Logger } from '@nestjs/common';
import { Assert } from '../lib/assert';
import { JwtPayload } from './jwt.payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { INVALID_CREDENTIALS } from '../lib/errors';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from './dto/sign.in.request.dto';
import { User } from './user.entity';
import { SmsRequestDto } from './dto/sms.request.dto';

@Injectable()
export class UserService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phone } });
  }

  async signIn(signInRequestDto: SignInRequestDto): Promise<{ token: string }> {
    const user = await this.getUserByPhone(signInRequestDto.phone);
    if (!user) {
      Assert.isTrue(true, INVALID_CREDENTIALS);
    }

    const payload: JwtPayload = { id: user.id };
    const token = await this.jwtService.sign(payload);

    return { token };
  }

  async sms(smsRequestDto: SmsRequestDto): Promise<void> {
    const { phone } = smsRequestDto;

    const user: User | undefined = await this.getUserByPhone(phone);
    if (!user) {
      await this.createUserByPhone(phone);
    }

    // TODO: send sms code
  }

  async createUserByPhone(phone: string): Promise<User> {
    return this.userRepository.createUser(phone);
  }
}
