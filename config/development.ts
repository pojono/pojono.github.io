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
    // accessKeyId: 'AKIA5V2FOLAQOHKKGA6A',
    // secretAccessKey: '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',
    // region: 'eu-central-1',
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
    /*
    port: '5324',
    host: '84.201.133.51',
    username: 'prostoadmin',
    password: 'O3lka3097ahqlsQxzlw39',
    */
    database: 'dev_ivan',
    synchronize: true,
    migrationsRun: false,
    logging: true,
  },
  iap: {
    enable: false,
  },
  managerEmail: 'ivan.chulkov@citronium.com',
  promocode: {
    discount: ['DEV_DISCOUNT_CODE1', 'DEV_DISCOUNT_CODE2'],
    trial: ['DEV_TRIAL_CODE1', 'DEV_TRIAL_CODE2'],
  },
};
