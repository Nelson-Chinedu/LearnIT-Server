import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Bio } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const getBioController = async (req: Request, res: Response) => {
  try {
    const { user: id } = req;
    const bio: Bio | null = await UserServices.getBio(id);

    respondWithSuccess(res, 200, 'Bio detail', { bio });
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getBioController;
