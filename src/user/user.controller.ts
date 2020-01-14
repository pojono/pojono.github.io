import {
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Body,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get.user.decorator';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { SmsRequestDto } from './dto/sms.request.dto';
import { SmsResponse } from './response/sms.response';
import { SignInRequestDto } from './dto/sign.in.request.dto';
import { SignInResponse } from './response/sign.in.response';
import * as config from 'config';
import { MeResponse } from './response/me.response';
import { GetRequestId } from '../lib/get.request.id.decorator';
import { UserUpdateDto } from './dto/user.update.dto';
import { SettingsResponse } from './response/settings.response';
import { GetStatatisticMeResponse } from '../main/response/get.statistic.me.response';
import { ReceiptResponse } from './response/receipt.response';
import { ReceiptUpdateDto } from './dto/receipt.update.dto';
import { AppTypeEnum } from './app.type.enum';

@ApiUseTags('users')
@Controller('user') // TODO: change to userS
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/sms')
  @ApiResponse({ status: 201, type: SmsResponse })
  @ApiOperation({
    title: 'Регистрация нового аккаунта или вход в существующий',
  })
  async sendSms(
    @GetRequestId() requestId,
    @Body(ValidationPipe) smsRequestDto: SmsRequestDto,
  ): Promise<SmsResponse> {
    await this.userService.sendSms(smsRequestDto);
    return new SmsResponse(requestId, null);
  }

  @Post('/signin')
  @ApiResponse({ status: 201, type: SignInResponse })
  @ApiOperation({
    title:
      'Используйте код 1234.' +
      ' Для авторизации к полученному токену нужно добавить слово Bearer и пробел. ' +
      ` Время жизни кода ${Number(config.get('sms.codeLifetime')) /
        1000} сек.` +
      ` Повторно отправить запрос на смс можно через ${Number(
        config.get('sms.minRepeatTime'),
      ) / 1000} сек.`,
  })
  async signIn(
    @GetRequestId() requestId,
    @Body(ValidationPipe) signInRequestDto: SignInRequestDto,
  ): Promise<SignInResponse> {
    return new SignInResponse(
      requestId,
      await this.userService.signIn(signInRequestDto),
    );
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: MeResponse })
  @ApiOperation({ title: 'Информация об авторизованном юзере' })
  async getMe(
    @GetRequestId() requestId,
    @GetUser() user: User,
  ): Promise<MeResponse> {
    return new MeResponse(requestId, user);
  }

  @Put('/me')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: MeResponse })
  @ApiOperation({ title: 'Редактирование полей юзера' })
  async editMyself(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @Body(ValidationPipe) userUpdateDto: UserUpdateDto,
  ): Promise<MeResponse> {
    return new MeResponse(
      requestId,
      await this.userService.editMyself(user, userUpdateDto),
    );
  }

  @Get('/settings')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: SettingsResponse })
  @ApiOperation({ title: 'Параметры приложения, заданные на сервере' })
  async getSettings(
    @GetRequestId() requestId,
    @GetUser() user: User,
  ): Promise<SettingsResponse> {
    return new SettingsResponse(requestId, {
      daysForNewBadge: config.get('daysForNewBadge'),
    });
  }

  @Put('/receipt')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ReceiptResponse })
  @ApiOperation({ title: 'Отправка чека о покупке на сервер для валидации' })
  async updateReceipt(
    @GetRequestId() requestId,
    @GetUser() user: User,
    @Body(ValidationPipe) receiptUpdateDto: ReceiptUpdateDto,
  ): Promise<ReceiptResponse> {
    await this.userService.processPurchase(
      user,
      receiptUpdateDto.iosPurchase,
      receiptUpdateDto.androidPurchase,
    );

    return new ReceiptResponse(requestId, null);
  }
}
