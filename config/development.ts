module.exports = {
  sms: {
    useCognito: false,
    useIqSms: true,
  },
  aws: {
    cognito: {
      userPoolId: 'eu-west-1_65Op52Obc',
    },
    bucketName: 'prostoapp',
    accessKeyId: 'minio',
    secretAccessKey: 'minio125',
    localSimulation: true,
    endpoint: 'http://127.0.0.1:9000',
    region: 'eu-west-1',
    link: {
      photos: '',
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
