import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

import swaggerDefinition from '../../doc/api-specification';

import authRoute from './auth';
import userRoute from './user';
import categoryRoute from './category';
import courseRoute from './course';
import resourceRoute from './resource';
import subscriptionRoute from './subscription';
import taskRoute from './task';

const specs = swaggerJsDoc(swaggerDefinition);
const router = express.Router();
const prefix = '/api/v1';
const apiDocs = '/api/v1/docs';
const specsConfig = setup(specs, {
  explorer: false,
  customSiteTitle: 'LearnIT',
});

router.use(apiDocs, serve);
router.use(apiDocs, specsConfig);
router.use(prefix, authRoute);
router.use(prefix, userRoute);
router.use(prefix, categoryRoute);
router.use(prefix, courseRoute);
router.use(prefix, resourceRoute);
router.use(prefix, subscriptionRoute);
router.use(prefix, taskRoute)

export default router;
