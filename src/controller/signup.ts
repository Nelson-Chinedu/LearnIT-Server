import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import hash from '../util/Hash';
import token from '../util/Token';

import UserServices from '../services/UserServices';

import { respondWithSuccess } from '../util/httpResponse';

const signupController = async (req: Request, res: Response) => {
  const hashedPassword = await hash.hashPassword(req.body.password);

  try {
    const userId: string = await UserServices.createUser({
      ...req.body,
      password: hashedPassword,
    });

    if (userId) {
      const accessToken = token.createToken(
        { id: userId },
        process.env.VERIFICATION_JWT_kEY as string,
        '2d'
      );
      const payload = {
        role: req.body.role,
        token: accessToken,
      };
      return respondWithSuccess(
        res.cookie('cid', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
        }),
        201,
        'Account created successfully',
        payload
      );
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occurred', error });
    throw new Error(error);
  }
};

export default signupController;
