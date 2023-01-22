import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

import UserServices from '../services/UserServices';

import { Account, Category } from '../db';

const addCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = {
    id,
    name: req.body.name,
  };

  try {
    const user: Account | null = await UserServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const category: Category = await UserServices.addCategory(payload);
    if (category) {
      respondWithSuccess(res, 201, 'Category created successfully', category);
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default addCategory;
