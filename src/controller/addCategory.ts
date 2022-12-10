import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

import UserServices from '../services/UserServices';

import { Category } from '../db';

const addCategory = async (req: Request, res: Response) => {
  const { user: id } = req;

  try {
    const payload = {
      id,
      name: req.body.name,
    };
    const category: Category = await UserServices.addCategory(payload);
    if (category) {
      respondWithSuccess(res, 201, 'Category created successfully', {});
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default addCategory;
