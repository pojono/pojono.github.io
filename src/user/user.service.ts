import { Injectable, Logger } from '@nestjs/common';
import { ErrorIf } from '../lib/error.if';
import { Promocode } from '../main/entity/promocode.entity';
import { UserPromocodeDto } from './dto/user.promocode.dto';
import { JwtPayload } from './jwt.payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PromocodeResponseDto } from './response/promocode.response';
import { UserRepository } from './user.repository';
import {
  AMAZON_COGNITO_ERROR,
  INVALID_CREDENTIALS,
  PURCHASE_VALIDATION_ERROR,
  SMS_TOO_OFTEN,
  SUBSCRIPRITON_IS_EXPIRED,
  TOKEN_ERROR,
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
import * as rp from 'request-promise-native';

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
const logger = new Logger('UserService');

import * as iap from 'in-app-purchase';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';
import { StoreEnviromentEnum } from './store.environment.enum';
import { Telegram } from '../lib/telegram';
import { ReceiptResponseDto } from './response/receipt.response';

const isRussianPhone = phoneNumber =>
  phoneNumber.length === 11 && phoneNumber[0] === '7';

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

  async ratingQuizFinished(user: User): Promise<User> {
    return this.userRepository.updateRatingQuiz(user, true);
  }

  async newsQuizFinished(user: User, quizId: number): Promise<void> {
    await this.userRepository.newsQuizFinished(user, quizId);
  }

  async giftQuizFinished(user: User): Promise<void> {
    await this.userRepository.giftQuizFinished(user);
  }

  /*
  async updatePromocode(
    requestId: string,
    user: User,
    userPromocodeDto: UserPromocodeDto,
  ): Promise<PromocodeResponseDto> {
    const trialCodes: string[] = config.get('promocode.trial');
    const discountCodes: string[] = config.get('promocode.discount');

    const promocode: string = userPromocodeDto.promocode.trim().toUpperCase();

    const isTrial: boolean = trialCodes.includes(promocode);
    const isDiscount: boolean = discountCodes.includes(promocode);

    if (isTrial || isDiscount) {
      await this.userRepository.updatePromocode(user, promocode);
      await Telegram.sendMessage(
        '🥑 Promocode: ' +
          promocode +
          `${isTrial ? ' [trial]' : ''}` +
          `${isDiscount ? ' [discount]' : ''}` +
          ' UserId: ' +
          user.id,
        requestId,
      );
    } else {
      await Telegram.sendMessage(
        '🤢 Wrong Promocode: ' + promocode + ' UserId: ' + user.id,
        requestId,
      );
    }
    return {
      isTrial,
      isDiscount,
    };
  }
  */

  async signIn(
    requestId: number,
    signInRequestDto: SignInRequestDto,
  ): Promise<{ token: string }> {
    const user = await this.getUserByPhone(signInRequestDto.phone);
    if (!user) {
      ErrorIf.isTrue(true, INVALID_CREDENTIALS);
    }

    try {
      if (user.phone === config.get('sms.phoneWithoutSms')) {
        ErrorIf.isFalse(
          signInRequestDto.code === config.get('sms.codeWithoutSms'),
          INVALID_CREDENTIALS,
        );
        await Telegram.sendMessage(
          '🔑 Authentication via BACKDOOR +' +
            user.phone +
            ' UserId: ' +
            user.id,
          requestId,
        );
      } else if (config.get('sms.useCognito') && !isRussianPhone(user.phone)) {
        const result: CognitoIdentityServiceProvider.Types.AdminRespondToAuthChallengeResponse = await this.respondToAuthChallenge(
          signInRequestDto.code,
          user.session,
          user.phone,
        );

        if (
          result.AuthenticationResult ||
          signInRequestDto.code === user.smsCode
        ) {
          await this.userRepository.updateSession(user, null);
          await Telegram.sendMessage(
            '🔑 Authentication via AMAZON +' +
              user.phone +
              ' UserId: ' +
              user.id,
            requestId,
          );
        } else {
          await this.userRepository.updateSession(user, result.Session);
          ErrorIf.isTrue(true, INVALID_CREDENTIALS);
        }
      } else if (config.get('sms.useIqSms') && isRussianPhone(user.phone)) {
        ErrorIf.isFalse(
          signInRequestDto.code === user.smsCode,
          INVALID_CREDENTIALS,
        );
        await Telegram.sendMessage(
          '🔑 Authentication via IQSMS +' + user.phone + ' UserId: ' + user.id,
          requestId,
        );
      } else if (!config.get('sms.useCognito') && !config.get('sms.useIqSms')) {
        ErrorIf.isFalse(
          signInRequestDto.code === config.get('sms.notRandom'),
          INVALID_CREDENTIALS,
        );
        if (!config.get('load_testing')) {
          await Telegram.sendMessage(
            '🔑 Authentication via 1234 +' + user.phone + ' UserId: ' + user.id,
            requestId,
          );
        }
      } else {
        ErrorIf.isTrue(true, INVALID_CREDENTIALS);
      }

      await this.userRepository.resetSmsCode(user);
      const payload: JwtPayload = { id: user.id };
      const token = await this.jwtService.sign(payload);

      return { token };
    } catch (err) {
      ErrorIf.isTrue(true, INVALID_CREDENTIALS);
    }
  }

  async generateSmsCode(): Promise<string> {
    const min = 1000; // TODO: move to config
    const max = 9999; // TODO: move to config
    return Math.round(min - 0.5 + Math.random() * (max - min + 1)).toString();
  }

  async sendSms(
    requestId: string,
    smsRequestDto: SmsRequestDto,
  ): Promise<boolean> {
    const { token } = smsRequestDto;
    let tokenUser;
    if (token) {
      try {
        // await this.jwtService.verifyAsync(token);
        const tokenData: any = await this.jwtService.decode(token);
        const tokenUserId = tokenData.id;
        tokenUser = await this.userRepository.getUserById(tokenUserId);
      } catch (err) {
        ErrorIf.isExist(err, TOKEN_ERROR);
      }
    }

    let newUser: boolean = false;
    const { phone } = smsRequestDto;

    let user: User | undefined = await this.getUserByPhone(phone);

    if (!user && tokenUser) {
      user = await this.userRepository.attachPhoneToUser(tokenUser, phone);
    }

    if (!user) {
      user = await this.createUserByPhone(phone);
      newUser = true;
      if (!config.get('load_testing')) {
        await Telegram.sendMessage(
          '🙋 New user +' + phone + ' UserId: ' + user.id,
          requestId,
        );
      }
    }

    ErrorIf.isTrue(this.isFewTime(user), SMS_TOO_OFTEN);
    await this.userRepository.updateLastCode(user);
    const code: string = await this.generateSmsCode();
    await this.userRepository.updateSmsCode(user, code);

    if (phone === config.get('sms.phoneWithoutSms')) {
      await Telegram.sendMessage(
        '📱 Sms request via BACKDOOR +' + phone,
        requestId,
      );
      return newUser;
    }

    if (config.get('sms.useCognitoUserPool')) {
      try {
        await this.adminGetUser(user.phone);
      } catch (err) {
        try {
          await this.signUp(user.phone);
        } catch (error) {
          ErrorIf.isTrue(true, AMAZON_COGNITO_ERROR);
        }
      }
    }

    if (config.get('sms.useCognito') && !isRussianPhone(user.phone)) {
      try {
        const authData: CognitoIdentityServiceProvider.Types.InitiateAuthResponse = await this.initiateAuth(
          user.phone,
        );
        await this.userRepository.updateSession(user, authData.Session);
        await Telegram.sendMessage(
          '📱 Sms request via AMAZON +' + phone,
          requestId,
        );
      } catch {
        ErrorIf.isTrue(true, AMAZON_COGNITO_ERROR);
      }
    }

    if (config.get('sms.useIqSms') && isRussianPhone(user.phone)) {
      const url: string = 'http://json.gate.iqsms.ru/send/';
      try {
        const response = await rp({
          url,
          method: 'POST',
          json: {
            login: 'z1581587763535',
            password: '450520',
            sender: 'Uservice',
            messages: [
              {
                phone: user.phone,
                clientId: 1,
                text: `Код для Prosto: ${code}`,
              },
            ],
          },
        });
        if (
          response &&
          response.messages &&
          response.messages[0] &&
          response.messages[0].status
        ) {
          if (response.messages[0].status === 'not enough balance') {
            await Telegram.sendMessage(
              '💸 Not enough money for IQSMS',
              requestId,
            );
          }
        }
      } catch (err) {
        logger.error('SMSERROR');
        logger.error(err);
      }
      await Telegram.sendMessage(
        '📱 Sms request via IQSMS +' + phone,
        requestId,
      );
    }

    if (!config.get('sms.useCognito') && !config.get('sms.useIqSms')) {
      if (!config.get('load_testing')) {
        await Telegram.sendMessage('📱 Sms not sent +' + phone, requestId);
      }
    }

    return newUser;
  }

  async getToken(requestId: string): Promise<{ token: string }> {
    const user: User = await this.createTokenUser();
    const payload: JwtPayload = { id: user.id };
    const token = await this.jwtService.sign(payload);
    await Telegram.sendMessage(
      '🙋 New user with token. UserId: ' + user.id,
      requestId,
    );
    return { token };
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

  async createTokenUser(): Promise<User> {
    return this.userRepository.createTokenUser();
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
          // this.logger.log(data); // successful response}
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
          // this.logger.log(data);
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
          // this.logger.log(data);
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
          // this.logger.log(data);
          resolve(data);
        }
      });
    });
  }

  async countTodayUsers(): Promise<number> {
    return this.userRepository.countUsers();
    /*
    // #STATS-2
    const dayAgo: Date = moment()
      .subtract(24, 'hour')
      .add(user.utcDiff, 'minutes')
      .toDate();
    return this.userRepository.countUsersWithActivityAfterDate(dayAgo);
    */
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

  async updateLatestLesson(user: User, lessonId: number): Promise<void> {
    await this.userRepository.updateLatestLesson(user, lessonId);
  }

  async maxStrike(): Promise<number> {
    return this.userRepository.countMaxStrike();
  }

  async updateStrike(user: User, utcDiff: number): Promise<void> {
    const todayDate = moment
      .utc()
      .add(utcDiff * -1, 'minutes')
      .startOf('day');
    const lastActivityDate = moment
      .utc(user.lastActivity)
      .add(utcDiff * -1, 'minutes')
      .startOf('day');
    const strikeDiff = todayDate.diff(lastActivityDate, 'days');

    if (strikeDiff === 1 || strikeDiff === 2 || user.currentStrike === 0) {
      await this.userRepository.incrementStrike(user);
    } else if (strikeDiff > 1) {
      await this.userRepository.resetStrike(user);
    }
  }

  async updateSession(user): Promise<void> {
    const lastActivity: moment.Moment = moment(user.lastActivity);
    const maxSessionIdleTime: number = config.get('sessionIdleDuration');
    const sessionEdgeTime: moment.Moment = moment
      .utc()
      .subtract(maxSessionIdleTime, 'minutes');

    // TODO: load test
    // this.logger.log('lastActivity ' + lastActivity.toISOString());
    // this.logger.log('sessionEdgeTime ' + sessionEdgeTime.toISOString());

    if (user.sessionsCounter === 0) {
      await this.userRepository.incrementSession(user);
    }

    if (lastActivity.isAfter(sessionEdgeTime)) {
      // this.logger.log(
      //   'Last Activity is not so far. Session counter does not change',
      // );
    } else {
      // this.logger.log('Last Activity was so far. Session counter +1');
      await this.userRepository.incrementSession(user);
    }
  }

  async activatePromocode(user: User, promocode: Promocode): Promise<void> {
    let endDate: moment.Moment;
    if (
      moment(user.subscriptionEndDate).isValid() &&
      moment(user.subscriptionEndDate).isAfter(moment.utc())
    ) {
      endDate = moment(user.subscriptionEndDate);
    } else {
      endDate = moment.utc();
    }

    const newEndDate = endDate.add(promocode.months, 'months').toDate();
    await this.userRepository.activatePromocode(user, newEndDate, promocode);
  }

  async processPurchase(
    requestId: string,
    user: User,
    iosPurchase: IosPurchase | undefined,
    androidPurchase: AndroidPurchase | undefined,
  ): Promise<ReceiptResponseDto> {
    if (iosPurchase) {
      const appType: AppTypeEnum = AppTypeEnum.IOS;
      const iosReceipt = iosPurchase.transactionReceipt;
      return this.validatePurchase(user, appType, iosReceipt, requestId, true);
    }
    if (androidPurchase) {
      const appType: AppTypeEnum = AppTypeEnum.ANDROID;
      const androidReceipt = {
        packageName: config.get('iap.androidPackageName'),
        productId: androidPurchase.productId,
        purchaseToken: androidPurchase.purchaseToken,
        subscription: true,
      };
      return this.validatePurchase(
        user,
        appType,
        androidReceipt,
        requestId,
        true,
      );
    }
  }

  async validatePurchase(
    user: User,
    appType: AppTypeEnum,
    receipt,
    requestId: string = 'validate_purchase',
    isNewReceipt: boolean = false,
  ): Promise<ReceiptResponseDto> {
    if (!config.get('iap.enable')) {
      return {
        subscriptionIsActive: true,
        validationResponse: {},
        validationResult: {},
      };
    }

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

    // const androidGoogleApi = google.androidpublisher({ version: 'v3' });

    await iap.setup();
    const validationResponse = await iap.validate(receipt);

    if (appType === AppTypeEnum.ANDROID) {
      ErrorIf.isFalse(
        validationResponse.service === 'google',
        PURCHASE_VALIDATION_ERROR,
      );
    }

    if (appType === AppTypeEnum.IOS) {
      ErrorIf.isFalse(
        validationResponse.service === 'apple',
        PURCHASE_VALIDATION_ERROR,
      );
    }

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

    const validationResult = {
      appType,
      environment,
      productId,
      origTxId,
      latestReceipt,
      validationResponse,
      startDate,
      endDate,
      isCancelled,
    };

    const updatedUser: User = await this.userRepository.updateSubscription(
      user,
      validationResult,
    );

    if (isNewReceipt) {
      await Telegram.sendMessage(
        `💸 New ${appType} receipt: ${productId} ${environment} Start: ${startDate.toISOString()} End: ${endDate.toISOString()} UserId: ${
          user.id
        }`,
        requestId,
      );
    }

    return {
      subscriptionIsActive: updatedUser.subscriptionIsActive(),
      validationResponse,
      validationResult,
    };

    // From https://developer.android.com/google/play/billing/billing_library_overview:
    // You must acknowledge all purchases within three days.
    // Failure to properly acknowledge purchases results in those purchases being refunded.
    /*
    if (
      appType === AppTypeEnum.ANDROID &&
      validationResponse.acknowledgementState === 0
    ) {
      try {
        await androidGoogleApi.purchases.subscriptions.acknowledge({
          packageName: config.get('iap.androidPackageName'),
          subscriptionId: productId,
          token: receipt.purchaseToken,
        });
      } catch (err) {
        this.logger.error(err);
      }
    }
    */
  }

  async shouldCheckSubscriptionAgain(user: User): Promise<boolean> {
    const dayAgoMoment: moment.Moment = moment
      .utc()
      .subtract(config.get('iap.checkingPeriod'), 'minute');
    return (
      !user.subscriptionLastValidation ||
      moment(user.subscriptionLastValidation).isBefore(dayAgoMoment)
    );
  }

  async subscriptionIsExpired(user: User): Promise<void> {
    // ErrorIf.isTrue(user.subscriptionIsCancelled, SUBSCRIPRITON_IS_CANCELLED);

    ErrorIf.isTrue(
      moment(user.subscriptionEndDate).isValid() &&
        moment(user.subscriptionEndDate).isBefore(moment.utc()),
      SUBSCRIPRITON_IS_EXPIRED,
    );
  }

  async updateSubscriptionStatus(user: User): Promise<void> {
    try {
      if (user.subscriptionPlatform === AppTypeEnum.IOS) {
        await this.validatePurchase(
          user,
          AppTypeEnum.IOS,
          user.subscriptionLatestReceipt,
        );
        await this.userRepository.updateLastSubscriptionValidation(user);
      }
      if (user.subscriptionPlatform === AppTypeEnum.ANDROID) {
        await this.validatePurchase(
          user,
          AppTypeEnum.ANDROID,
          JSON.parse(user.subscriptionLatestReceipt),
        );
        await this.userRepository.updateLastSubscriptionValidation(user);
      }
    } catch (err) {
      // ErrorIf.isTrue(true, PURCHASE_VALIDATION_ERROR);
      logger.error('Purchase validation error with user.id =' + user.id);
      logger.error(JSON.stringify(err));
    }
  }
}
