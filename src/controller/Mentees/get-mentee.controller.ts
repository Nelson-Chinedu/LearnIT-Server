import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Subscription } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import SubscriptionServices from '../../services/Subscription/Subscription.services';

import {
  respondWithSuccess,
  respondWithWarning,
} from '../../util/httpResponse';

const getMenteeController = async (req: Request, res: Response) => {
  const { menteeId, mentorId } = req.params;

  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const mentee: Subscription = await SubscriptionServices.getSubscribedMentee(
      mentorId,
      menteeId
    );

    if (mentee) {
      respondWithSuccess(res, 200, 'successfull', mentee);
    } else {
      respondWithSuccess(res, 404, 'Profile not found', {});
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getMenteeController;
