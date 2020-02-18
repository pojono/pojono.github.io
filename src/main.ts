import SharedFunctions from './lib/shared.functions';

if (process.env.IMAGE_TAG) {
  process.env.TAG = process.env.IMAGE_TAG;
}
process.env.INSTANCE = Math.random()
  .toString(36)
  .slice(2, 2 + Math.max(1, Math.min(3, 10)));

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';
import HTTP_CODE_DESCRIPTION from './http.description';
import * as ERRORS from './lib/errors';
import { AllExceptionsFilter } from './lib/all.exception.filter';
import { Telegram } from './lib/telegram';
import * as rp from 'request-promise-native';

const logger = new Logger('Bootstrap');

process.on('SIGTERM', async function onSigterm() {
  const message: string =
    '⚡️️❗️ SIGTERM: #' + process.env.TAG + ' <' + process.env.NODE_ENV + '>';
  logger.log(message);
  await Telegram.sendImportantMessage(message);
});

process.on('SIGINT', async function onSigint() {
  const message: string =
    '⚡⭕️️ SIGINT: #' + process.env.TAG + ' <' + process.env.NODE_ENV + '>';
  logger.log(message);
  await Telegram.sendImportantMessage(message);
});

process.on('uncaughtException', async err => {
  const message: string =
    '⚡🆘 uncaughtException: #' +
    process.env.TAG +
    ' <' +
    process.env.NODE_ENV +
    '> ' +
    err;
  logger.error(message);
  logger.error(err.stack);
  await Telegram.sendImportantMessage(message);
  process.exit(1);
});

process.on('unhandledRejection', async (err: any) => {
  const message: string =
    '⚡️⛔️ unhandledRejection: #' +
    process.env.TAG +
    ' <' +
    process.env.NODE_ENV +
    '> ' +
    err;
  logger.error(message);
  logger.error(err.stack || err);
  await Telegram.sendImportantMessage(message);
  process.exit(1);
});

async function checkOutside() {
  return rp.get({
    uri: config.get('server.url'),
    json: true,
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const scheme: 'http' | 'https' = config.get('swagger.scheme');
  if (config.get('swagger.enable')) {
    const errors = Object.keys(ERRORS).reduce(
      (allText, currentError) =>
        allText +
        `${ERRORS[currentError].getCode()}. ${ERRORS[
          currentError
        ].getMessage()} \n`,
      '',
    );
    const options = new DocumentBuilder()
      .setTitle('ProstoApp')
      .addBearerAuth()
      .addTag('users', 'TODO: изменить роуты на мн. число')
      .addTag('rubrics', 'Все рубрики и страница конкретной рубрики')
      .addTag('main', 'Главная страница приложения')
      .addTag('courses', 'Курсы')
      .addTag('lessons', 'Занятия в курсе')
      .addTag('fast_support', 'Быстрая помощь')
      .addTag('statistics', 'Статистика по приложению')
      .addTag('quizzes', 'Диалоги в псевдо-мессенджере')
      .addTag('events', 'Ивенты о происходящем в приложении')
      .addTag('onboardings', 'Онбоардинги')
      .addTag('root', 'Системная информация о сервере')
      .setDescription(
        'Server started at: ' +
          new Date().toISOString() +
          ' (UTC) \n' +
          HTTP_CODE_DESCRIPTION +
          ' \n  \n' +
          errors +
          '',
      )
      .setVersion(process.env.TAG || 'PLEASE SET ENV TAG')
      .setSchemes(scheme)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.get('swagger.path'), app, document);
  }

  const port: number = Number(process.env.PORT) || config.get('server.port');
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);

  const startMessage: string =
    '⚡️✅ Start: ' +
    SharedFunctions.uptime() +
    ' #' +
    process.env.TAG +
    ' <' +
    process.env.NODE_ENV +
    '> ';

  await Telegram.sendMessage(startMessage);

  /*
  try {
    await checkOutside();

    const healthMessage: string =
      '⚡️❇️ Network. Up: ' +
      SharedFunctions.uptime() +
      ' #' +
      process.env.TAG +
      ' <' +
      process.env.NODE_ENV +
      '>';

    await Telegram.sendMessage(healthMessage);
  } catch (error) {
    const message: string =
      '⚡️❌️ NetworkError: #' +
      process.env.TAG +
      ' <' +
      process.env.NODE_ENV +
      '> ' +
      error;
    await Telegram.sendImportantMessage(message);
  }
  */
}

(async () => {
  bootstrap().catch(async err => {
    const message: string =
      '⚡️📛️ BootstrapError: #' +
      process.env.TAG +
      ' <' +
      process.env.NODE_ENV +
      '> ' +
      err;
    logger.error(message);
    logger.error(err.stack || err);
    await Telegram.sendImportantMessage(message);
    process.exit(1);
  });
})();
