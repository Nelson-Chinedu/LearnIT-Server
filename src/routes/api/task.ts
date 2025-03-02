import express from 'express';

import createTaskController from '../../controller/Task/create-task.controller';
import mentorTasks from '../../controller/Task/get-mentor-tasks.controller';
import menteeSubmission from '../../controller/Task/get-mentee-submission.controller';
import updateTaskFeedback from '../../controller/Task/task-feedback.controller';
import getTaskfeedback from '../../controller/Task/get-task-feedback.controller';

import { authentication } from '../../middlewares/authentication';

import taskValidator from '../../validation/taskValidator';

const router = express.Router();

router.post(
  '/task/:mentorId/mentor',
  authentication,
  taskValidator,
  createTaskController
);

router.get('/task/:menteeId/mentor/:mentorId', authentication, mentorTasks);

router.get(
  '/task/:taskId/mentor/:mentorId/submission',
  authentication,
  menteeSubmission
);

router.patch(
  '/task/:taskId/mentor/:mentorId',
  authentication,
  updateTaskFeedback
);

router.get(
  '/task/:taskId/mentor/:mentorId/feedback',
  authentication,
  getTaskfeedback
);

export default router;
