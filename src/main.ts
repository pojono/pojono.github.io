import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';
import HTTP_CODE_DESCRIPTION from './http.description';
import * as ERRORS from './lib/errors';

async function bootstrap() {
  const logger = new Logger('bootstrap');

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
      .setDescription(
        'ProstoApp API specification. ' +
          HTTP_CODE_DESCRIPTION +
          ' \n ``` \n' +
          errors +
          '```',
      )
      .setVersion(process.env.IMAGE_TAG || 'PLEASE SET IMAGE_TAG')
      .setSchemes(scheme)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.get('swagger.path'), app, document);
  }

  const port: number = Number(process.env.PORT) || config.get('server.port');
  app.enableCors();

  await app.listen(port);

  logger.log(`App started on port ${port} on ${process.env.NODE_ENV} env`);
}

(async () => {
  await bootstrap();
})();
