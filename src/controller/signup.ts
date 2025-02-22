import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import hash from '../util/Hash';
import token from '../util/Token';
import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

import { signupTemplate } from '../template/mail';

import UserServices from '../services/UserServices';

import { eventEmitter } from '../index';

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
        verificationLink: `${process.env.CLIENT_URL}/auth/verify?t=${accessToken}`,
      };

      // if (process.env.NODE_ENV === 'production') {
        eventEmitter.emit('verification_mail', {
          email: process.env.DEVELOPER_EMAIL,
          from: process.env.MAIL_FROM,
          subject: 'Confirm your LearnIT account',
          body: signupTemplate({
            name: `${req.body.firstname} ${req.body.lastname}`,
            url: payload.verificationLink,
            role: req.body.role
          }),
        });
      // }

      return respondWithSuccess(
        res,
        201,
        `We just sent a verification link to ${req.body.email}`,
        payload
      );
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occurred', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default signupController;
