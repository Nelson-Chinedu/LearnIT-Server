import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import {
  respondWithSuccess,
  respondWithWarning,
} from '../../util/httpResponse';

import { Account, Feedback } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import TaskServices from '../../services/Task/Task.services';

const taskFeedback = async (req: Request, res: Response) => {
  const { mentorId, taskId } = req.params;

  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const feedback: Feedback[] | null = await TaskServices.getTaskFeedback(
      mentorId,
      taskId
    );

    if (feedback) {
      respondWithSuccess(res, 200, 'Successfull', feedback);
    }
  } catch (error) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default taskFeedback;
