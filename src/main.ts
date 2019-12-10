import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';
import HTTP_CODE_DESCRIPTION from './http.description';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  const scheme: 'http' | 'https' = config.get('swagger.scheme');
  if (config.get('swagger.enable')) {
    const options = new DocumentBuilder()
      .setTitle('ProstoApp')
      .addBearerAuth()
      .setDescription('ProstoApp API specification. ' + HTTP_CODE_DESCRIPTION)
      .setVersion('0.0.1')
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
