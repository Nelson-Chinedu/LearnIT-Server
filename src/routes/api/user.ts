import express from 'express';

import userController from '../../controller/user';

import { authorization } from '../../middlewares/authorization';

const router = express.Router();

router.get('/user/me', authorization, userController);

export default router;
