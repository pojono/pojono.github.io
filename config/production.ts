module.exports = {
  server: {
    port: 80,
    url: 'https://production.prostoapp.com/',
  },
  logs: {
    showHeaders: false,
  },
  swagger: {
    enable: false,
    scheme: 'https',
  },
  sms: {
    useCognito: true, // CAN`T USE FOR RUSSIAN PHONES; ONLY IF useCognitoUserPool: true
    useCognitoUserPool: true,
    useIqSms: true, // ONLY FOR RUSSIAN PHONES
  },
  aws: {
    cognito: {
      userPoolId: 'eu-west-1_65Op52Obc',
    },
    bucketName: 'photos.prostoapp.com',
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
    host: 'prod-db.czt41szsg5y0.eu-west-1.rds.amazonaws.com',
    username: 'prostoadmin',
    password: 'Pioj32wo8han20y1kKKxaw4egp23',
    database: 'prostoapp',
    synchronize: false,
    migrationsRun: false,
  },
  iap: {
    enable: true,
    testMode: false,
    debugLogs: false,
  },
  managerEmail: 'pr@prostoapp.com',
  terminalPassword: 'dsf0l7eoow3sawsn',
  promocode: {
    discount: [
      /*
      // 'AVOCADO',
      'SPASIBO',
      'SNJR5D',
      'GREEN4LIFE',
      'HAPPY',
      'NOSTRESS',
      */
    ],
    trial: [
      /*
      'VDOH',
      'VDOH2751',
      'VDOH5681',
      'VDOH1275',
      'ULIBKA',
      'SKAZHIDA',
      'SVOBODA',
      'SVOBODA371',
      'SVOBODA846',
      'SVOBODA578',
      'PRIVET',
      'PRIVET6825',
      'PRIVET5185',
      'PRIVET5815',
      'GREENGODDESS',
      'YESWECAN',
      'CALM',
      'HEADSPACE',
      */
    ],
  },
};
