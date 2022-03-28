const dotenv = require('dotenv');

const isDevEnv = () => process.env.NODE_ENV === 'development';

const isTestEnv = () => process.env.NODE_ENV === 'test';

let connString =
  process.env.NODE_ENV === 'development'
    ? process.env.DB_DEV_URL
    : process.env.NODE_ENV === 'production'
    ? process.env.DB_PROD_URL
    : process.env.DB_TEST_URL;

const getEnvVariables = {
  logging: isDevEnv() || isTestEnv() ? true : false,
  synchronize: isDevEnv() || isTestEnv() ? true : false,
};

const entities = isDevEnv()
  ? `${__dirname}/src/db/entity/**/*.ts`
  : isTestEnv()
  ? `${__dirname}/build/db/entity/**/*.js`
  : `${__dirname}/build/db/entity/**/*.js`;

module.exports = {
  type: 'postgres',
  url: connString,
  synchronize: getEnvVariables.synchronize,
  logging: getEnvVariables.logging,
  entities: [entities],
  migrations: ['src/db/migration/**/*.ts'],
  subscribers: ['src/db/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/db/entity',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber',
  },
};
