import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const userController = async (req: Request, res: Response) => {
  const { user: id }: any = req;

  try {
    const user: Account | null = await UserServices.findUserById(id);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    if (user) {
      const {
        profile: {
          firstname,
          lastname,
          phone,
          city,
          state,
          zipCode,
          address,
          country,
          account: { email, role },
        },
      } = user;

      respondWithSuccess(res, 200, 'User details', {
        firstname,
        lastname,
        phone,
        city,
        state,
        zipCode,
        address,
        country,
        email,
        role,
      });
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    throw new Error(error);
  }
};

export default userController;
