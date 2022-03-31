import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';
import { respondWithSuccess } from '../util/httpResponse';

import token from '../util/Token';

interface IReq {
  user: {
    id: string;
  };
}

const signinController = (req: any, res: Response) => {
  try {
    const { id } = req.user;
    const accessToken = token.createToken(
      { id },
      process.env.VERIFICATION_JWT_kEY as string,
      '2d'
    );
    return respondWithSuccess(
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      }),
      200,
      'Logged in successfully',
      {}
    );
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    throw new Error(error);
  }
};

export default signinController;
