import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { typeOrmConfig } from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from './main/main.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, MainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
