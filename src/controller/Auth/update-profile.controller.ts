import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const data: UpdateResult = await AuthServices.updateProfile(id, req.body);

    if (data.affected === 0) {
      respondWithSuccess(res, 404, 'Profile not found', {});
    } else {
      respondWithSuccess(res, 204, 'Profile updated successfully', {});
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default updateProfile;
