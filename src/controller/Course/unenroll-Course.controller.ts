import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';
import { Account } from '../../db';

import AuthServices from '../../services/Auth/Auth.services';
import CourseServices from '../../services/Course/Course.services';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

const unenrollCourse = async (req: Request, res: Response) => {
  const { id, courseId } = req.params;

  const payload = {
    id,
    courseId,
  };
  try {
    const user: Account | null = await AuthServices.findUserById(req.user);

    if (!user) respondWithWarning(res, 401, 'unauthorized', {});

    const course = await CourseServices.unenrollCourse(payload);

    if (course.affected === 0)
      respondWithWarning(res, 404, 'Course not found', {});
    else {
      respondWithSuccess(res, 204, 'Unenrolled successfully', {});
    }
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default unenrollCourse;
