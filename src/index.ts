import 'reflect-metadata';
import '@babel/polyfill';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';

import router from './routes';

const config = require('../ormconfig');

export const AppDataSource = new DataSource(config);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);
app.get('/', (_req: Request, res: Response) =>
  res.status(200).send({ message: 'Welcome to LearnIT' })
);

AppDataSource.initialize()
  .then(() => {
    winstonEnvLogger.info({ message: 'DB connected successfully' });
  })
  .catch((error: Error) => winstonEnvLogger.error({ message: error }));

export default app;
