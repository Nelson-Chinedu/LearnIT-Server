import express from 'express';

import getProfileController from '../../controller/getProfile';
import updateProfile from '../../controller/updateProfile';

import { authorization } from '../../middlewares/authorization';

import profileValidator from '../../validation/profile';

const router = express.Router();

router.get('/user/me', authorization, getProfileController);
router.put('/user/me', authorization, profileValidator, updateProfile);

export default router;
