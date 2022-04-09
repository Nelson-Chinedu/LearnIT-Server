import express from 'express';
import authRoute from './auth';
import userRoute from './user';

const router = express.Router();
const prefix = '/api/v1';

router.use(prefix, authRoute);
router.use(prefix, userRoute);

export default router;
