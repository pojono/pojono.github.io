module.exports = {
  server: {
    url: 'https://staging.prostoapp.com/',
  },
  logs: {
    showHeaders: true,
  },
  swagger: {
    scheme: 'https',
  },
  sms: {
    useCognito: false,
  },
  aws: {
    cognito: {
      userPoolId: 'eu-west-1_65Op52Obc',
    },
    bucketName: 'prosto-photo',
    accessKeyId: 'AKIA2KBHWCGXUEKU3YH2',
    secretAccessKey: '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',
    cloudfrontUrl: 'https://photos.prostoapp.com/',
    cloudfrontAccessKeyId: 'AKIA2KBHWCGXSSM46W64',
    cloudfrontSecretAccessKey: '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',
    acl: '2615fc25b468d319ff6caa88c1e6307ad962c16b551344c3bf15968c30dc6d13',
    contentSize: 50000000,
    localSimulation: false,
    region: 'eu-west-1',
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
