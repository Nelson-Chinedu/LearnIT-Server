import express from 'express';

import getProfileController from '../../controller/getProfile';
import updateBio from '../../controller/updateBio';
import updateProfile from '../../controller/updateProfile';
import addCourse from '../../controller/addCourse';

import { authentication } from '../../middlewares/authentication';

import profileValidator from '../../validation/profile';
import mentorBioValidator from '../../validation/mentorBio';
import courseValidator from '../../validation/course';
import UserMiddleware from '../../middlewares/UserMiddleware';
import videoUpload from '../../controller/videoUpload';

const router = express.Router();

router.get('/user/me', authentication, getProfileController);
router.put('/user/me', authentication, profileValidator, updateProfile);
router.put('/user/me/bio', authentication, mentorBioValidator, updateBio);
router.post(
  '/upload/video',
  authentication,
  UserMiddleware.findRole,
  videoUpload
);
router.post(
  '/add/course',
  authentication,
  UserMiddleware.findRole,
  courseValidator,
  addCourse
);

export default router;
