import {
  Controller,
  Get,
  Logger,
  Post,
  UseGuards,
  ValidationPipe,
  Body,
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

@ApiUseTags('users')
@Controller('user') // TODO: change to userS
export class UserController {
  private logger = new Logger();

  constructor(private userService: UserService) {}

  @Post('/sms')
  @ApiResponse({ status: 201, type: SmsResponse })
  @ApiOperation({
    title: 'Регистрация нового аккаунта или вход в существующий',
  })
  async sms(
    @Body(ValidationPipe) smsRequestDto: SmsRequestDto,
  ): Promise<SmsResponse> {
    await this.userService.sms(smsRequestDto);
    return new SmsResponse(null);
  }

  @Post('/signin')
  @ApiResponse({ status: 201, type: SignInResponse })
  @ApiOperation({
    title:
      'Используйте код 1234 для авторизации на тестовом сервере.' +
      ' Для авторизации к полученному токену нужно добавить слово Bearer и пробел. ' +
      ` Время жизни кода ${config.get('sms.codeLifetime')} мс` +
      ` Повторно отправить запрос на смс можно через ${config.get(
        'sms.minRepeatTime',
      )} мс`,
  })
  async signIn(
    @Body(ValidationPipe) signInRequestDto: SignInRequestDto,
  ): Promise<SignInResponse> {
    return new SignInResponse(await this.userService.signIn(signInRequestDto));
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: MeResponse })
  @ApiOperation({ title: 'Информация об авторизованном юзере' })
  async getMe(@GetUser() user: User): Promise<MeResponse> {
    return new MeResponse(user);
  }
}
