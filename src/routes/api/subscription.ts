import express from 'express';

import getSubscriptionsController from '../../controller/getSubscriptions';
import subscriptionController from '../../controller/subscription';
import verifyPaymentController from '../../controller/verifyPaymentController';

import { authentication } from '../../middlewares/authentication';

const router = express.Router();

router.get('/subscription/:id/', authentication, getSubscriptionsController);

router.post('/subscription/:id/', authentication, subscriptionController);

router.get(
  '/subscription/:referenceID/verify-payment/',
  authentication,
  verifyPaymentController
);

export default router;
