import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || config.get('db.host'),
  port: Number(process.env.DB_PORT) || config.get('db.port'),
  username: process.env.DB_USERNAME || config.get('db.username'),
  password: process.env.DB_PASSWORD || config.get('db.password'),
  database: process.env.DB_NAME || config.get('db.database'),
  entities: [__dirname + '/../**/*.entity.*s'],
  synchronize: config.get('db.synchronize'),
  migrations: config.get('db.migrations'),
  cli: {
    migrationsDir: config.get('db.migrationsDir'),
  },
  migrationsRun: config.get('db.migrationsRun'),
  logging: config.get('db.logging'),
};
