import express from 'express';
import authRoute from './auth';

const router = express.Router();
const prefix = '/api/v1';

router.use(prefix, authRoute);

export default router;
