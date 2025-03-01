import express from 'express';

import createTaskController from '../../controller/Task/create-task.controller';
import mentorTasks from '../../controller/Task/get-mentor-tasks.controller';

import { authentication } from '../../middlewares/authentication';

import taskValidator from '../../validation/taskValidator';

const router = express.Router();

router.post(
  '/task/:mentorId/mentor',
  authentication,
  taskValidator,
  createTaskController
);

router.get(
  '/task/:mentorId/mentor/:menteeId',
  authentication,
  // taskValidator,
  mentorTasks
);

export default router;
