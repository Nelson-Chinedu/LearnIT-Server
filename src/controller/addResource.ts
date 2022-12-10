import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

import UserServices from '../services/UserServices';

import { Resource } from '../db';

const addResource = async (req: Request, res: Response) => {
  const { user: id } = req;

  try {
    const payload = {
      accountId: id,
      categoryId: req.body.category,
      name: req.body.name,
      url: req.body.url,
    };
    const resource: Resource = await UserServices.addResource(payload);
    if (resource) {
      respondWithSuccess(res, 201, 'Resource added successfully', {});
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default addResource;
