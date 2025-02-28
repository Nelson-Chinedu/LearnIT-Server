import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

import AuthServices from '../../services/Auth/Auth.services';
import ResourceServices from '../../services/Resource/Resource.services';

import { Account, Resource } from '../../db';

const addResource = async (req: Request, res: Response) => {
  const { id } = req.params;

  const payload = {
    id,
    categoryId: req.body.categoryId,
    name: req.body.name,
    url: req.body.url,
  };
  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const resource: Resource = await ResourceServices.addResource(payload);
    if (resource) {
      respondWithSuccess(res, 201, 'Resource added successfully', resource);
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default addResource;
