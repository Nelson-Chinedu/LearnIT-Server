import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { respondWithSuccess } from '../util/httpResponse';

import token from '../util/Token';

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
      res.cookie('cid', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      }),
      200,
      'Logged in successfully',
      payload
    );
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    throw new Error(error);
  }
};

export default signinController;
