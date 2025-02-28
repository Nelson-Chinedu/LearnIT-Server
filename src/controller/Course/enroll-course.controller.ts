import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import { Enroll } from '../../db';

import CourseServices from '../../services/Course/Course.services';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';

const enrollCourse = async (req: Request, res: Response) => {
  try {
    const { id, courseId } = req.params;
    const payload = {
      id,
      courseId,
    };

    const enroll: Enroll = await CourseServices.enrollCourse(payload);
    respondWithSuccess(res, 201, 'Enrolled successfully', enroll);
  } catch (error: any) {
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default enrollCourse;
