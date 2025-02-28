import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Course } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import CourseServices from '../../services/Course/Course.services';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

const getCourses = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const courses: Course[] = await CourseServices.getCourses(id);

    respondWithSuccess(res, 200, 'successfull', courses);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getCourses;
