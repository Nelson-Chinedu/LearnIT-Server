import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import {
  respondWithSuccess,
  respondWithWarning,
} from '../../util/httpResponse';

import AuthServices from '../../services/Auth/Auth.services';
import TaskServices from '../../services/Task/Task.services';

import { Account } from '../../db';

const createTaskController = async (req: Request, res: Response) => {
  const { mentorId } = req.params;
  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const newTask = await TaskServices.createTask(req.body, mentorId);

    if (newTask) {
      respondWithSuccess(res, 201, 'Task created successfully', newTask);
    }
  } catch (error) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default createTaskController;
