import { Request, Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

import UserServices from '../services/UserServices';

import { respondWithSuccess, respondWithWarning } from '../util/httpResponse';

const getEnrollCourseDetailController = async (req: Request, res: Response) => {
  try {
    const {
      user: accountId,
      params: { courseId },
    } = req;

    const payload = {
      accountId,
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
          count,
          video,
          thumbnail,
          preview,
          objectives,
          faq,
        },
      } = courseDetail;

      respondWithSuccess(res, 200, 'Course detail', {
        id,
        name,
        price,
        count,
        video,
        thumbnail,
        preview,
        objectives,
        faq,
        courseDetail,
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
