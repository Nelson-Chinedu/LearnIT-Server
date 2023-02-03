import 'reflect-metadata';
import '@babel/polyfill';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { EventEmitter } from 'events';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';
// @ts-ignore
import winstonEnvLogger from 'winston-env-logger';

import router from './routes';

import { ISocketData } from './interface/ISocket';

import { sendMail } from './events/sendMail';

const config = require('../ormconfig');

const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
};

export const eventEmitter = new EventEmitter();

export const AppDataSource = new DataSource(config);

const app = express();

const server = createServer(app);

app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

eventEmitter.on('verification_mail', sendMail);

app.use(router);
app.get('/', (_req: Request, res: Response) =>
  res.status(200).send({ message: 'Welcome to LearnIT' })
);

AppDataSource.initialize()
  .then(() => {
    winstonEnvLogger.info({ message: 'DB connected successfully' });
  })
  .catch((error: Error) => winstonEnvLogger.error({ message: error }));

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: any) => {
  winstonEnvLogger.info({ message: `${socket.id} Connected to socket` });

  socket.on('join_room', (data: string) => {
    socket.join(data);
  });

  socket.on('chat', (data: ISocketData) => {
    socket.nsp.to(data.roomNumber).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    winstonEnvLogger.info({ message: `${socket.id} left the chat` });
  });
});

export default server;
