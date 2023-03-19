import express from 'express';

import getAllMentorsController from '../../controller/getAllMentors';
import getMenteesController from '../../controller/getMenteesController';
import getMentorsController from '../../controller/getMentorsController';
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

router.get(
  '/subscription/mentors/all/',
  authentication,
  getAllMentorsController
);

router.get('/subscription/:id/mentors/', authentication, getMentorsController);

router.get('/subscription/:id/mentees/', authentication, getMenteesController);

export default router;
