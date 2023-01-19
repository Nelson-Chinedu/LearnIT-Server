import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Bio } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const getBioController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user: Account | null = await UserServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const bio: Bio | null = await UserServices.getBio(id);

    if (!bio) {
      respondWithSuccess(res, 404, 'Bio not found', {});
    } else {
      respondWithSuccess(res, 200, 'Bio detail', { bio });
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getBioController;
