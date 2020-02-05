module.exports = {
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
    localSimulation: false,
    region: 'eu-west-1',
  },
  db: {
    port: '5454',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'prostoapp',
    synchronize: true,
    migrationsRun: true,
    logging: true,
  },
};
