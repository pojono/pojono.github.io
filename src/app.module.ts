import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { typeOrmConfig } from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from './main/main.module';
import { routerLogger } from './lib/router.logger';
import { AllExceptionsFilter } from './lib/all.exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, MainModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(routerLogger).forRoutes('*');
  }
}
