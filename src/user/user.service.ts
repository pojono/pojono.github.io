import { Injectable, Logger } from '@nestjs/common';
import { ErrorIf } from '../lib/error.if';
import { JwtPayload } from './jwt.payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {
  AMAZON_COGNITO_ERROR,
  INVALID_CREDENTIALS,
  PURCHASE_VALIDATION_ERROR,
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
import { AndroidPurchase, IosPurchase } from './dto/receipt.update.dto';
import { AppTypeEnum } from './app.type.enum';

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

import * as iap from 'in-app-purchase';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';
import { StoreEnviromentEnum } from './store.environment.enum';

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

  async countTodayUsers(user: User): Promise<number> {
    // #STATS-2
    const dayAgo: Date = moment()
      .subtract(24, 'hour')
      .add(user.utcDiff * -1, 'minutes')
      .toDate();
    return this.userRepository.countUsersWithActivityAfterDate(dayAgo);
  }

  async addTotalListenTime(user: User, sessionsDuration: number) {
    const sumDuration: number = user.sessionsDuration + sessionsDuration;
    await this.userRepository.updateSessionsDuration(user, sumDuration);
  }

  async updateUtcDiff(user: User, utcDiff: number): Promise<User> {
    return this.userRepository.updateUtcDiff(user, utcDiff);
  }

  async updateLastActivity(user: User): Promise<void> {
    await this.userRepository.updateLastActivity(user);
  }

  async updateLatestCourse(user: User, courseId: number): Promise<void> {
    await this.userRepository.updateLatestCourse(user, courseId);
  }

  async maxStrike(): Promise<number> {
    return this.userRepository.countMaxStrike();
  }

  async updateStrike(user: User, utcDiff: number): Promise<void> {
    const lastActivity: moment.Moment = moment(user.lastActivity);

    const reverseUtcDiff: number = utcDiff * -1;
    const serverTime: moment.Moment = moment.utc();
    const userTime: moment.Moment = moment.utc().add(reverseUtcDiff, 'minute');
    const userStartToday: moment.Moment = moment
      .utc()
      .startOf('day')
      .add(reverseUtcDiff, 'minute');
    const userStartYesterday: moment.Moment = moment(userStartToday).subtract(
      24,
      'hour',
    );

    this.logger.log('lastActivity ' + lastActivity.toISOString());
    this.logger.log('serverTime ' + serverTime.toISOString());
    this.logger.log('userTime ' + userTime.toISOString());
    this.logger.log('userStartToday ' + userStartToday.toISOString());
    this.logger.log('userStartYesterday ' + userStartYesterday.toISOString());

    if (lastActivity.isAfter(userStartToday)) {
      this.logger.log('Last Activity is Today. Strike does not change');
    }

    if (
      lastActivity.isAfter(userStartYesterday) &&
      lastActivity.isBefore(userStartToday)
    ) {
      this.logger.log('Last Activity was yesterday. Strike +1');
      await this.userRepository.incrementStrike(user);
    }

    if (lastActivity.isBefore(userStartYesterday)) {
      this.logger.log('LastActivity was before yesterday. Strike = 1');
      await this.userRepository.resetStrike(user);
    }
  }

  async updateSession(user): Promise<void> {
    const lastActivity: moment.Moment = moment(user.lastActivity);
    const maxSessionIdleTime: number = config.get('sessionIdleDuration');
    const sessionEdgeTime: moment.Moment = moment
      .utc()
      .subtract(maxSessionIdleTime, 'minutes');

    this.logger.log('lastActivity ' + lastActivity.toISOString());
    this.logger.log('sessionEdgeTime ' + sessionEdgeTime.toISOString());

    if (lastActivity.isAfter(sessionEdgeTime)) {
      this.logger.log(
        'Last Activity is not so far. Session counter does not change',
      );
    } else {
      this.logger.log('Last Activity was so far. Session counter +1');
      await this.userRepository.incrementSession(user);
    }
  }

  async processPurchase(
    user: User,
    iosPurchase: IosPurchase | undefined,
    androidPurchase: AndroidPurchase | undefined,
  ): Promise<void> {
    if (iosPurchase) {
      const appType: AppTypeEnum = AppTypeEnum.IOS;
      const iosReceipt = iosPurchase.transactionReceipt;
      await this.validatePurchase(user, appType, iosReceipt);
    }
    if (androidPurchase) {
      const appType: AppTypeEnum = AppTypeEnum.ANDROID;
      const androidReceipt = {
        packageName: config.get('iap.androidPackageName'),
        productId: androidPurchase.productId,
        purchaseToken: androidPurchase.purchaseToken,
        subscription: true,
      };
      await this.validatePurchase(user, appType, androidReceipt);
    }
  }

  async validatePurchase(
    user: User,
    appType: AppTypeEnum,
    receipt,
  ): Promise<void> {
    iap.config({
      // If you want to exclude old transaction, set this to true. Default is false:
      // appleExcludeOldTransactions: true,
      applePassword: config.get('iap.appleSharedSecret'),

      googleServiceAccount: {
        clientEmail: config.get('iap.googleServiceAccountEmail'),
        privateKey: config.get('iap.googleServiceAccountPrivateKey'),
      },

      /* Configurations all platforms */
      test: config.get('iap.testMode'), // For Apple and Google Play to force Sandbox validation only
      verbose: config.get('iap.debugLogs'), // Output debug logs to stdout stream
    });

    google.options({
      auth: new JWT(
        config.get('iap.googleServiceAccountEmail'),
        null,
        config.get('iap.googleServiceAccountPrivateKey'),
        ['https://www.googleapis.com/auth/androidpublisher'],
      ),
    });

    const androidGoogleApi = google.androidpublisher({ version: 'v3' });

    await iap.setup();
    const validationResponse = await iap.validate(receipt);

    ErrorIf.isFalse(
      appType === AppTypeEnum.ANDROID &&
        validationResponse.service === 'google',
      PURCHASE_VALIDATION_ERROR,
    );
    ErrorIf.isFalse(
      appType === AppTypeEnum.IOS && validationResponse.service === 'apple',
      PURCHASE_VALIDATION_ERROR,
    );

    const purchaseData = iap.getPurchaseData(validationResponse);
    const firstPurchaseItem = purchaseData[0];

    const isCancelled = iap.isCanceled(firstPurchaseItem);
    // const isExpired = iap.isExpired(firstPurchaseItem);

    const { productId } = firstPurchaseItem;

    const origTxId =
      appType === AppTypeEnum.IOS
        ? firstPurchaseItem.originalTransactionId
        : firstPurchaseItem.transactionId;
    const latestReceipt =
      appType === AppTypeEnum.IOS
        ? validationResponse.latest_receipt
        : JSON.stringify(receipt);
    const startDate =
      appType === AppTypeEnum.IOS
        ? new Date(firstPurchaseItem.originalPurchaseDateMs)
        : new Date(parseInt(firstPurchaseItem.startTimeMillis, 10));
    const endDate =
      appType === AppTypeEnum.IOS
        ? new Date(firstPurchaseItem.expiresDateMs)
        : new Date(parseInt(firstPurchaseItem.expiryTimeMillis, 10));

    let environment = '';
    // validationResponse contains sandbox: true/false for Apple and Amazon
    // Android we don't know if it was a sandbox account
    if (appType === AppTypeEnum.IOS) {
      environment = validationResponse.sandbox
        ? StoreEnviromentEnum.SANDBOX
        : StoreEnviromentEnum.PRODUCTION;
    }

    await this.userRepository.updateSubscription(user, {
      appType,
      environment,
      productId,
      origTxId,
      latestReceipt,
      validationResponse,
      startDate,
      endDate,
      isCancelled,
    });

    // From https://developer.android.com/google/play/billing/billing_library_overview:
    // You must acknowledge all purchases within three days.
    // Failure to properly acknowledge purchases results in those purchases being refunded.
    if (
      appType === AppTypeEnum.ANDROID &&
      validationResponse.acknowledgementState === 0
    ) {
      await androidGoogleApi.purchases.subscriptions.acknowledge({
        packageName: config.get('iap.androidPackageName'),
        subscriptionId: productId,
        token: receipt.purchaseToken,
      });
    }
  }
}
