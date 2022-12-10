import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Resource } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const getAllResource = async (req: Request, res: Response) => {
  try {
    const { user: id } = req;
    const payload = {
      accountId: id,
      categoryId: req.body.category,
    };

    const user: Account | null = await UserServices.findUserById(id);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const resources: Resource[] = await UserServices.getResources(payload);

    respondWithSuccess(res, 200, 'successfull', resources);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getAllResource;
