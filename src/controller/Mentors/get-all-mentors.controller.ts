import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import ProfileServices from '../../services/Profile/Profile.services';

import {
  respondWithSuccess,
  respondWithWarning,
} from '../../util/httpResponse';

const getAllMentorsController = async (req: Request, res: Response) => {
  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const mentors: Account[] = await ProfileServices.getAllMentors();

    respondWithSuccess(res, 200, 'successfull', mentors);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getAllMentorsController;
