import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';
import { DeleteResult } from 'typeorm';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

import AuthServices from '../../services/Auth/Auth.services';
import ResourceServices from '../../services/Resource/Resource.services';

import { Account } from '../../db';

import { IResource } from '../../interface/IResource';

const deleteResource = async (req: Request, res: Response) => {

  const payload: IResource = {
    resourceId: req.params.id,
  };

  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const resource: DeleteResult = await ResourceServices.deleteResource(payload);

    if (resource.affected === 0) {
      respondWithSuccess(res, 404, 'Resource not found', {});
    }else{
      respondWithSuccess(res, 204, 'Resource deleted successfully', {});
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default deleteResource;
