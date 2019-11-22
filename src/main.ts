import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  if (config.get('swagger.enable')) {
    const options = new DocumentBuilder()
      .setTitle('ProstoApp')
      .addBearerAuth()
      .setDescription('ProstoApp API specification')
      .setVersion('0.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.get('swagger.path'), app, document);
  }

  const port: number = Number(process.env.PORT) || config.get('server.port');
  app.enableCors();

  await app.listen(port);

  logger.log(`App started on port ${port} on ${process.env.NODE_ENV} mode`);
}

(async () => {
  await bootstrap();
})();
