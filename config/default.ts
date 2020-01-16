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
    logging: false,
  },
  sms: {
    minRepeatTime: 60000,
    codeLifetime: 5 * 60000,
    notRandom: '1234',
    useCognito: false,
    phoneWithoutSms: '73141592653',
    codeWithoutSms: '0112',
  },
  daysForNewBadge: 7,
  sessionIdleDuration: 10,
  iap: {
    androidPackageName: 'com.mobile.prostoapp',
    googleServiceAccountEmail: '',
    googleServiceAccountPrivateKey: '',
    appleSharedSecret: 'b66c14a5404944e0afbae43da689fb0e',
    testMode: true,
    debugLogs: true,
  },
};
