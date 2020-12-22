import { Module } from '@nestjs/common';
import { StatisticStrikeHistory } from '../main/entity/statistic.strike.history.entity';
import { StatisticStrikeHistoryService } from '../main/service/statistic.strike.history.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || config.get('jwt.secret'),
      signOptions: {
        expiresIn: config.get('jwt.expiresIn'),
      },
    }),
    TypeOrmModule.forFeature([UserRepository, StatisticStrikeHistory]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, StatisticStrikeHistoryService],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
