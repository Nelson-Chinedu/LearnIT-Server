import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Subscription } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import SubscriptionServices from '../../services/Subscription/Subscription.services';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

const getMenteesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const mentors: Subscription[] = await SubscriptionServices.getSubscribedMentees(id);

    respondWithSuccess(res, 200, 'successfull', mentors);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getMenteesController;
