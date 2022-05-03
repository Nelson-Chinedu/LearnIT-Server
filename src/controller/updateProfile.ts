import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user: id } = req;
    const user: Account | null = await UserServices.findUserById(id);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    if (user) {
      const { profile } = user;
      const data: object = await UserServices.updateProfile(
        profile.id,
        req.body
      );

      if (data) {
        respondWithSuccess(res, 204, 'Profile updated successfully', {});
      }
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    throw new Error(error);
  }
};

export default updateProfile;
