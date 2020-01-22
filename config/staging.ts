module.exports = {
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
