import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import {
  respondWithSuccess,
  respondWithWarning,
} from '../../util/httpResponse';

import AuthServices from '../../services/Auth/Auth.services';
import TaskServices from '../../services/Task/Task.services';

import { Account } from '../../db';

const updateTaskFeedbackController = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { feedback } = req.body;

  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const newFeedback = await TaskServices.taskFeedback({ feedback, taskId });

    respondWithSuccess(res, 201, 'Feedback created successfully', newFeedback);

  } catch (error) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default updateTaskFeedbackController;
