module.exports = {
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
