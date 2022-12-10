import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Category } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const { user: id } = req;

    const user: Account | null = await UserServices.findUserById(id);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const categories: Category[] = await UserServices.getCategories(id);

    respondWithSuccess(res, 200, 'successfull', categories);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getAllCategory;
