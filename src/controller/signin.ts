import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

import token from '../util/Token';
import { cookieOptions } from '../util/cookieOptions';

const signinController = (req: Request, res: Response) => {
  try {
    const { id, role }: any = req.user;
    const accessToken = token.createToken(
      { id },
      process.env.VERIFICATION_JWT_kEY as string,
      '2d'
    );

    const payload = {
      role,
      token: accessToken,
    };
    return respondWithSuccess(
      res.cookie('cid', accessToken, cookieOptions),
      200,
      'Logged in successfully',
      payload
    );
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default signinController;
