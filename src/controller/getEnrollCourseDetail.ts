import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const getEnrollCourseDetailController = async (req: Request, res: Response) => {
  try {
    const { id: userId, courseId } = req.params;

    const payload = {
      id: userId,
      courseId,
    };

    const courseDetail = await UserServices.getEnrollCourseDetail(payload);

    if (!courseDetail) respondWithSuccess(res, 404, 'Course not found', {});

    if (courseDetail) {
      const {
        course: {
          id,
          name,
          price,
          video,
          thumbnail,
          preview,
          objectives,
          faq,
          profile: { firstname, lastname },
        },
      } = courseDetail;

      respondWithSuccess(res, 200, 'Course detail', {
        id,
        name,
        price,
        video,
        thumbnail,
        preview,
        objectives,
        faq,
        firstname,
        lastname,
      });
    }
  } catch (error: any) {
    if (error.routine === 'string_to_uuid') {
      respondWithWarning(res, 400, 'Invalid course ID', {});
    }
    winstonEnvLogger.error({ message: 'An error occured', error });
    respondWithWarning(res, 400, 'An error occurred', {});
  }
};

export default getEnrollCourseDetailController;
