import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Course } from '../db';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const getAllCourses = async (_req: Request, res: Response) => {
  try {
    const courses: Course[] = await UserServices.getAllCourses();

    respondWithSuccess(res, 200, 'successfull', courses);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getAllCourses;
