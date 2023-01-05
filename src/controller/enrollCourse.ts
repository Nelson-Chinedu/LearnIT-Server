import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const enrollCourse = async (req: Request, res: Response) => {
  try {
    const {
      user,
      body: { courseId },
    } = req;
    const payload = {
      accountId: user,
      courseId,
    };

    const course = await UserServices.enrollCourse(payload);
    respondWithSuccess(res, 200, 'Enrolled successfully', course);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default enrollCourse;
