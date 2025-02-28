import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';
import { UpdateResult } from 'typeorm';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

import AuthServices from '../../services/Auth/Auth.services';
import ResourceServices from '../../services/Resource/Resource.services';

import { Account } from '../../db';

import { IEditResource } from '../../interface/IResource';

const editResource = async (req: Request, res: Response) => {
  const payload: IEditResource = {
    categoryId: req.body.categoryId,
    name: req.body.name,
    url: req.body.url,
    resourceId: req.body.resourceId,
  };
  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const resource: UpdateResult = await ResourceServices.editResource(payload);
    if (resource) {
      respondWithSuccess(res, 200, 'Resource updated successfully', resource);
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default editResource;
