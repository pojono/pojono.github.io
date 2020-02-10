module.exports = {
  server: {
    url: 'https://staging.prostoapp.com/',
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
    acl: '2615fc25b468d319ff6caa88c1e6307ad962c16b551344c3bf15968c30dc6d13',
    contentLength: 20000000,
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
