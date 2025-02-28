import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import SubscriptionServices from '../../services/Subscription/Subscription.services';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

const getSubscriptionsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const subscriptions = await SubscriptionServices.getSubscriptions(id);

    respondWithSuccess(res, 200, 'successfull', subscriptions);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getSubscriptionsController;
