import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const getProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { user: id } = req;

  try {
    const user: Account | null = await UserServices.findUserById(id);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    if (user) {
      const {
        profile: {
          account: { email, role, subscription, isSubscribed },
          ...rest
        },
      } = user;

      respondWithSuccess(res, 200, 'User details', {
        email,
        role,
        subscription,
        isSubscribed,
        ...rest,
      });
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getProfileController;
