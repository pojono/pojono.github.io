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
    minRepeatTime: 60000,
    codeLifetime: 5 * 60000,
    notRandom: '1234',
    useCognito: false,
  },
};
