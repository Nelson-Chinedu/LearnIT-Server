import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import AuthServices from '../../services/Auth/Auth.services';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';
import Token from '../../util/Token';

const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) respondWithWarning(res, 400, 'Something went wrong', {});

  try {
    const verifiedToken: any = Token.verifyToken(
      token,
      process.env.VERIFICATION_JWT_kEY as string
    );

    if (verifiedToken) {
      const { id } = verifiedToken;
      const account = await AuthServices.findUserById(id);

      if (!account) respondWithWarning(res, 404, 'Not found', {});
      if (account && account.verified) {
        respondWithSuccess(
          res,
          200,
          'Email address already verified, proceed to login',
          {}
        );
      } else {
        await AuthServices.verifyEmail(id);
        respondWithSuccess(
          res,
          200,
          'Email address verified, proceed to login',
          {}
        );
      }
    } else {
      respondWithWarning(res, 400, 'Something went wrong', {});
    }
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    respondWithWarning(res, 400, 'Something went wrong', {});
  }
};

export default verifyEmail;
