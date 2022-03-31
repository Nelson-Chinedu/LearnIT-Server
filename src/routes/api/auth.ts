import express from 'express';

import signupController from '../../controller/signup';
import signinController from '../../controller/signin';

import signupValidator from '../../validation/signup';
import signinValidator from '../../validation/signin';

import UserMiddleware from '../../middlewares/UserMiddleware';

const router = express.Router();

router.post(
  '/auth/signup',
  signupValidator,
  UserMiddleware.findEmail,
  signupController
);

router.post(
  '/auth/signin',
  signinValidator,
  UserMiddleware.findUser,
  signinController
);

export default router;
