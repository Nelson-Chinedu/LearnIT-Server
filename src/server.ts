// @ts-ignore
import winstonEnvLogger from 'winston-env-logger';
import app from './index';

// const PORT = process.env.PORT || 8080;

app.listen(process.env.PORT || 8080, () => {
  winstonEnvLogger.info({
    message: `Server started on port ${process.env.PORT || 8080}`,
  });
  winstonEnvLogger.info({
    message: `Press CTRL + C to stop Server`,
  });
});

export default app;
