import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import BioServices from '../../services/Bio/Bio.services';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

const updateBio = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const data: UpdateResult = await BioServices.updateBio(id, req.body);

    if (data.affected === 0) {
      respondWithWarning(res, 404, 'Bio not found', {});
    } else {
      respondWithSuccess(res, 204, 'Bio updated successfully', {});
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default updateBio;
