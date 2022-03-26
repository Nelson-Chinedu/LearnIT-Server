import winstonEnvLogger from 'winston-env-logger';
import app from './index';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  winstonEnvLogger.info({
    message: `Server started on port ${PORT}`,
  });
  winstonEnvLogger.info({
    message: `Press CTRL + C to stop Server`,
  });
});

export default app;
