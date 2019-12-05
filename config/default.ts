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
    scheme: 'http',
  },
  db: {
    migrations: ['./src/infrastructure/database/typeorm/migrations/*.ts'],
    migrationsDir: './src/infrastructure/database/typeorm/migrations/',
  },
  sms: {
    minCode: 1000,
    maxCode: 9999,
    minRepeatTime: 60000,
    codeLifetime: 5 * 60000,
    isRandom: false,
    notRandom: 1234,
  },
};
