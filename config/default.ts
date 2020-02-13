module.exports = {
  server: {
    port: 3001,
    url: 'http://localhost:3001',
  },
  logs: {
    showHeaders: false,
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
    port: '5454',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'prostoapp',
    synchronize: true,
    migrationsRun: true,
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
  aws: {
    bucketName: 'prostoapp',
    accessKeyId: 'minio',
    secretAccessKey: 'minio125',
    localSimulation: true,
    endpoint: 'http://127.0.0.1:9000',
    region: 'eu-west-1',
  },
  picture: {
    width: 6000,
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
  telegram: {
    chatId: '-397651856',
    token: '972600463:AAEI9vGgLyPJbzfTxowAhwso_vym53A2i7Y',
  },
};
