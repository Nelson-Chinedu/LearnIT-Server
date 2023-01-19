import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Resource } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const getAllResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user: Account | null = await UserServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const resources: Resource[] = await UserServices.getAllResources(id);

    respondWithSuccess(res, 200, 'successfull', resources);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getAllResource;
