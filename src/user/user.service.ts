import { Injectable, Logger } from '@nestjs/common';
import { ErrorIf } from '../lib/error.if';
import { JwtPayload } from './jwt.payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {
  AMAZON_COGNITO_ERROR,
  INVALID_CREDENTIALS,
  SMS_TOO_OFTEN,
} from '../lib/errors';

import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from './dto/sign.in.request.dto';
import { User } from './user.entity';
import { SmsRequestDto } from './dto/sms.request.dto';
import * as AWS from 'aws-sdk';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import * as config from 'config';
import { UserUpdateDto } from './dto/user.update.dto';
import * as moment from 'moment';

// TODO: move to config
AWS.config.update({
  region: 'eu-west-1', // config.get('aws.region');
  accessKeyId: 'AKIA2KBHWCGX7R552NHR', // config.get('aws.accessKeyId');
  secretAccessKey: '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', // config.get('aws.secretAccessKey');
});
const provider = new AWS.CognitoIdentityServiceProvider();
// const clientId = '5a80aug1stlpbqdgclv3pfvhlv'; // config.get('aws.cognito.clientId');
// const userPoolId: string = config.get('aws.cognito.userPoolId');

const clientId = '1sm0t6a4ml5keiqtmvb3mnkqlf';
const userPoolId = 'eu-west-1_Zpp22BnuX';

const phonePlus = phone => '+' + phone;

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

  async editMyself(user: User, userUpdateDto: UserUpdateDto): Promise<User> {
    return this.userRepository.updateUser(user, userUpdateDto);
  }

  async signIn(signInRequestDto: SignInRequestDto): Promise<{ token: string }> {
    const user = await this.getUserByPhone(signInRequestDto.phone);
    if (!user) {
      ErrorIf.isTrue(true, INVALID_CREDENTIALS);
    }

    try {
      if (config.get('sms.useCognito')) {
        const result: CognitoIdentityServiceProvider.Types.AdminRespondToAuthChallengeResponse = await this.respondToAuthChallenge(
          signInRequestDto.code,
          user.session,
          user.phone,
        );

        if (result.AuthenticationResult) {
          await this.userRepository.updateSession(user, null);
        } else {
          await this.userRepository.updateSession(user, result.Session);
          ErrorIf.isTrue(true, INVALID_CREDENTIALS);
        }
      } else {
        ErrorIf.isFalse(
          signInRequestDto.code === config.get('sms.notRandom'),
          INVALID_CREDENTIALS,
        );
      }
      const payload: JwtPayload = { id: user.id };
      const token = await this.jwtService.sign(payload);

      return { token };
    } catch (err) {
      ErrorIf.isTrue(true, INVALID_CREDENTIALS);
    }
  }

  async sendSms(smsRequestDto: SmsRequestDto): Promise<void> {
    const { phone } = smsRequestDto;

    let user: User | undefined = await this.getUserByPhone(phone);
    if (!user) {
      user = await this.createUserByPhone(phone);
    }
    ErrorIf.isTrue(this.isFewTime(user), SMS_TOO_OFTEN);
    await this.userRepository.updateLastCode(user);

    if (config.get('sms.useCognito')) {
      try {
        await this.adminGetUser(user.phone);
      } catch (err) {
        try {
          await this.signUp(user.phone);
        } catch (error) {
          ErrorIf.isTrue(true, AMAZON_COGNITO_ERROR);
        }
      }
      try {
        const authData: CognitoIdentityServiceProvider.Types.InitiateAuthResponse = await this.initiateAuth(
          user.phone,
        );
        await this.userRepository.updateSession(user, authData.Session);
      } catch {
        ErrorIf.isTrue(true, AMAZON_COGNITO_ERROR);
      }
    }
  }

  isFewTime(user): boolean {
    const REPEAT_SMS_TIME_MS: number = config.get('sms.minRepeatTime');
    if (!user.lastCode) {
      return false;
    }
    return Math.abs(Number(new Date()) - user.lastCode) < REPEAT_SMS_TIME_MS;
  }

  async createUserByPhone(phone: string): Promise<User> {
    return this.userRepository.createUser(phone);
  }

  async initiateAuth(phone: string) {
    phone = phonePlus(phone);

    const params: CognitoIdentityServiceProvider.Types.InitiateAuthRequest = {
      AuthFlow: 'CUSTOM_AUTH',
      ClientId: clientId,
      AuthParameters: {
        USERNAME: phone,
      },
    };

    return new Promise((resolve, reject) => {
      provider.initiateAuth(params, async (err, data) => {
        if (err) {
          this.logger.error(err, err.stack);
          reject(err);
        } else {
          this.logger.log(data); // successful response}
          resolve(data);
        }
      });
    });
  }

  async respondToAuthChallenge(code: string, session: string, phone: string) {
    phone = phonePlus(phone);

    const params: CognitoIdentityServiceProvider.Types.AdminRespondToAuthChallengeRequest = {
      ChallengeName: 'CUSTOM_CHALLENGE',
      ClientId: clientId,
      UserPoolId: userPoolId,
      ChallengeResponses: {
        USERNAME: phone,
        ANSWER: code,
      },
      Session: session,
    };

    return new Promise((resolve, reject) => {
      provider.adminRespondToAuthChallenge(params, (err, data) => {
        if (err) {
          this.logger.error(err, err.stack);
          reject(err);
        } else {
          this.logger.log(data);
          resolve(data);
        }
      });
    });
  }

  async signUp(phone: string) {
    phone = phonePlus(phone);

    const params: CognitoIdentityServiceProvider.Types.SignUpRequest = {
      ClientId: clientId,
      Username: phone,
      // TODO: generate random password
      Password: 'caff2a4536f3669c7071197b2f67fbaad49acf4a66adb40d59464f06b84b',
      UserAttributes: [
        {
          Name: 'name',
          Value: phone,
        },
      ],
      ValidationData: null,
    };

    return new Promise((resolve, reject) => {
      provider.signUp(params, (err, data) => {
        if (err) {
          this.logger.error(err, err.stack);
          reject(err);
        } else {
          this.logger.log(data);
          resolve(data);
        }
      });
    });
  }

  async adminGetUser(phone: string) {
    phone = phonePlus(phone);

    const params: CognitoIdentityServiceProvider.Types.AdminGetUserRequest = {
      Username: phone,
      UserPoolId: userPoolId,
    };

    return new Promise((resolve, reject) => {
      provider.adminGetUser(params, (err, data) => {
        if (err) {
          this.logger.error(err, err.stack);
          reject(err);
        } else {
          this.logger.log(data);
          resolve(data);
        }
      });
    });
  }

  async countTodayUsers(): Promise<number> {
    const dayAgo: Date = moment()
      .subtract(24, 'hour')
      .toDate();
    return this.userRepository.countUsersWithActivityAfterDate(dayAgo);
  }

  async updateLastActivity(user: User): Promise<void> {
    await this.userRepository.updateLastActivity(user);
  }

  async maxStrike(): Promise<number> {
    return this.userRepository.countMaxStrike();
  }
}
