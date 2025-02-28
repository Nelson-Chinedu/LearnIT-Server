import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Enroll } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import CourseServices from '../../services/Course/Course.services';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

const getEnrolledCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const enrolledCourses: Enroll[] = await CourseServices.getEnrolledCourse(id);

    respondWithSuccess(res, 200, 'successfull', enrolledCourses);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getEnrolledCourse;
