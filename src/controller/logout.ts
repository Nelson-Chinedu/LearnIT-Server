import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';
import Token from '../util/Token';

const logoutController = (req: Request, res: Response) => {
  try {
    if ('cid' in req.cookies) {
      const token = req.cookies;

      const data: any = Token.verifyToken(
        token.cid,
        process.env.VERIFICATION_JWT_kEY as string
      );
      if (data) {
        res.clearCookie('cid');
        respondWithSuccess(res, 200, 'logout successful', {});
        res.end();
      }
    } else {
      winstonEnvLogger.error({ message: 'An error occurred' });
      respondWithWarning(res, 401, 'An error occurred', {});
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default logoutController;
