import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const subscriptionController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { mentorId, card } = req.body;
  const { user: menteeAccountId } = req

  try {
    const user: Account | null = await UserServices.findUserById(req.user);
    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const subscription = await UserServices.addSubscription(id, {
      mentorId,
      card,
      menteeAccountId
    });

    if (subscription) {
      respondWithSuccess(res, 201, 'Subscribed successfully', subscription);
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default subscriptionController;
