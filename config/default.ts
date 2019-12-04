module.exports = {
  server: {
    port: 3001,
  },
  jwt: {
    expiresIn: 3600000,
    secret: 'TopSecret',
  },
  swagger: {
    enable: true,
    path: 'swagger',
  },
  db: {
    migrations: ['./src/infrastructure/database/typeorm/migrations/*.ts'],
    migrationsDir: './src/infrastructure/database/typeorm/migrations/',
  },
  sms: {
    // TODO: only 4 digits by spec in code
    minCode: 100000,
    maxCode: 999999,
    minRepeatTime: 60000,
    codeLifetime: 5 * 60000,
    isRandom: false,
    notRandom: 1234,
  },
};
