import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_req: Request, res: Response) =>
  res.status(200).send({ message: 'Welcome to LearnIT' })
);

export default app;
