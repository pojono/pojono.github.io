module.exports = {
  server: {
    port: 80,
    url: 'https://staging-new.prostoapp.com/',
  },
  logs: {
    showHeaders: true,
  },
  swagger: {
    scheme: 'https',
  },
  sms: {
    useCognito: false,
    useIqSms: false,
  },
  aws: {
    cognito: {
      userPoolId: 'eu-west-1_65Op52Obc',
    },
    bucketName: 'prosto-photo',
    accessKeyId: 'AKIA2KBHWCGXUEKU3YH2',
    secretAccessKey: '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',
    localSimulation: false,
    region: 'eu-west-1',
    link: {
      photos: 'https://photos.prostoapp.com/',
    },
  },
  db: {
    port: '5432',
    host: 'prosto-dev.czt41szsg5y0.eu-west-1.rds.amazonaws.com',
    username: 'postgres',
    password: 'lIEfoljnekol389halks32',
    database: 'prostoapp',
    synchronize: true,
    migrationsRun: true,
  },
};
