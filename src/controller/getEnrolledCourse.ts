import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const getEnrolledCourse = async (req: Request, res: Response) => {
  try {
    const { user: id } = req;

    const enrolledCourses = await UserServices.getEnrolledCourse(id);
    respondWithSuccess(res, 200, 'successfull', enrolledCourses);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getEnrolledCourse;
