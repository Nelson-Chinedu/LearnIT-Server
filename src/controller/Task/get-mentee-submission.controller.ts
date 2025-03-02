import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import {
  respondWithSuccess,
  respondWithWarning,
} from '../../util/httpResponse';

import { Account, Task } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import TaskServices from '../../services/Task/Task.services';

const menteeTask = async (req: Request, res: Response) => {
  const { mentorId, taskId } = req.params;

  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const submission: Task | null = await TaskServices.getMenteeSubmission(
      mentorId,
      taskId
    );

    if (submission) {
      respondWithSuccess(res, 200, 'Successfull', submission);
    }
  } catch (error) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default menteeTask;
