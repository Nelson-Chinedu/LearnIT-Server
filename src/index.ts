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
import * as redis from 'redis';
// @ts-ignore
import winstonEnvLogger from 'winston-env-logger';

import router from './routes';

import { ISocketData } from './interface/ISocket';

import { sendMail } from './events/sendMail';

const config = require('../ormconfig');

const client: any = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  legacyMode: true,
});

client.connect().then((res: any) => {
  winstonEnvLogger.info({ message: `${res} connected` });
});

const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
};

export const eventEmitter = new EventEmitter();

export const AppDataSource = new DataSource(config);

const app = express();

const server = createServer(app);

client.on('error', (err: Error) => {
  winstonEnvLogger.info({ message: `${err}` });
});

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

const io: any = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

function sendMessage(socket: any, id: any) {
  client.lrange(id, '0', '-1', (err: any, data: any) => {
    if (err)
      winstonEnvLogger.info({ message: `${err} Connecting to redis server` });
    data.map((x: any) => {
      socket.nsp.to(id).emit('receive_message', JSON.parse(x));
    });
  });
}

io.on('connection', (socket: any) => {
  winstonEnvLogger.info({ message: `${socket.id} Connected to socket` });
  socket.on('join_room', (data: string) => {
    socket.join(data);
    sendMessage(socket, data);
  });

  socket.on('chat', (data: ISocketData) => {
    client.rPush(data.roomNumber, JSON.stringify(data), (err: any) => {
      if (err) {
        winstonEnvLogger.info({ message: `${err}` });
      }
      // the nsp sends a broadcast message to the receiver and to the initiator
      // socket.nsp.to(data.roomNumber).emit('receive_message', data);
      io.to(data.roomNumber).emit('receive_message', data);
    });
  });

  socket.on('leave_room', (data: any) => {
    winstonEnvLogger.info({ message: `${data} left room` });
  });

  socket.on('disconnect', () => {
    winstonEnvLogger.info({ message: `${socket.id} left the chat` });
  });
});

export default server;
