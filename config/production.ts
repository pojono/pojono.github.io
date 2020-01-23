module.exports = {
  server: {
    url: 'https://production.prostoapp.com/',
  },
  swagger: {
    enable: false,
  },
  sms: {
    useCognito: true,
  },
  aws: {
    cognito: {
      userPoolId: '',
    },
  },
  db: {
    port: '',
    host: '',
    username: '',
    password: '',
    database: '',
    synchronize: false,
    migrationsRun: false,
  },
};
