import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

import UserServices from '../services/UserServices';

import { Account, Course } from '../db';

const addCourse = async (req: Request, res: Response) => {
  const { user: id } = req;

  try {
    const user: Account | null = await UserServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const data: Course = await UserServices.addCourse(req.body, id);

    if (data) {
      respondWithSuccess(res, 201, 'Course created successfully', data);
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default addCourse;
