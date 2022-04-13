import express from 'express';

import getProfileController from '../../controller/getProfile';
import updateBio from '../../controller/updateBio';
import updateProfile from '../../controller/updateProfile';

import { authorization } from '../../middlewares/authorization';

import profileValidator from '../../validation/profile';
import mentorBioValidator from '../../validation/mentorBio';

const router = express.Router();

router.get('/user/me', authorization, getProfileController);
router.put('/user/me', authorization, profileValidator, updateProfile);
router.put('/user/me/bio', authorization, mentorBioValidator, updateBio);

export default router;
