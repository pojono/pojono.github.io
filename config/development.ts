module.exports = {
  sms: {
    useCognito: false, // CAN`T USE FOR RUSSIAN PHONES; ONLY IF useCognitoUserPool: true
    useCognitoUserPool: false,
    useIqSms: false, // ONLY FOR RUSSIAN PHONES
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
    synchronize: false,
    migrationsRun: true,
    logging: false,
  },
  iap: {
    enable: false,
  },
  promocode: {
    discount: ['DEV_DISCOUNT_CODE1', 'DEV_DISCOUNT_CODE2'],
    trial: ['DEV_TRIAL_CODE1', 'DEV_TRIAL_CODE2'],
  },
};
