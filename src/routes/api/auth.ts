import express from 'express';

import signupController from '../../controller/signup';

import signupValidator from '../../validation/signup';

import UserMiddleware from '../../middlewares/UserMiddleware';

const router = express.Router();

router.post(
  '/auth/signup',
  signupValidator,
  UserMiddleware.checkUser,
  signupController
);

export default router;
