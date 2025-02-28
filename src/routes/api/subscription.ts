import express from 'express';

import getAllMentorsController from '../../controller/Mentors/get-all-mentors.controller';
import getMenteesController from '../../controller/Mentees/get-mentees.controller';
import getMentorsController from '../../controller/Mentors/get-mentors.controller';
import getSubscriptionsController from '../../controller/Subscriptions/get-subscriptions.controller';
import subscriptionController from '../../controller/Subscriptions/subscription.controller';
import verifyPaymentController from '../../controller/Payment/verify-payment.controller';
import getStudentCountsController from '../../controller/Mentors/get-mentees-counts.controller';

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

router.get('/subscription/:id/count', authentication, getStudentCountsController)

export default router;
