module.exports = {
  sms: {
    useCognito: true,
  },
  aws: {
    cognito: {
      userPoolId: 'eu-west-1_65Op52Obc',
    },
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
