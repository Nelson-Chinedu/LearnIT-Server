import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Category } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import CategoryServices from '../../services/Category/Category.services';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const categories: Category[] = await CategoryServices.getCategories(id);

    respondWithSuccess(res, 200, 'successfull', categories);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getAllCategory;
