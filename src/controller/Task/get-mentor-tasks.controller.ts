import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import {
  respondWithSuccess,
  respondWithWarning,
} from '../../util/httpResponse';

import { Account } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import TaskServices from '../../services/Task/Task.services';

import { ITask } from '../../interface/ITask';

const mentorTasks = async (req: Request, res: Response) => {
  const { mentorId, menteeId } = req.params;

  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const tasks: ITask[] = await TaskServices.getMentorTasks(
      mentorId,
      menteeId
    );

    respondWithSuccess(res, 200, 'Successfull', tasks);
  } catch (error) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default mentorTasks;
