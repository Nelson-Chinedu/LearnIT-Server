import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const updateBio = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user: id } = req;
    const user: Account | null = await UserServices.findUserById(id);

    if (user) {
      const {
        profile: { account },
      } = user;

      const data: object = await UserServices.updateBio(account.id, req.body);

      if (data) {
        respondWithSuccess(res, 204, 'Bio updated successfully', {});
      }
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default updateBio;
