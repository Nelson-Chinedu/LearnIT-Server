import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

import UserServices from '../services/UserServices';

import { Course } from '../db';

const addCourse = async (req: Request, res: Response) => {
  const { user: id } = req;

  try {
    const data: Course = await UserServices.addCourse(req.body, id);
    if (data) {
      respondWithSuccess(res, 201, 'Course created successfully', {});
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default addCourse;
