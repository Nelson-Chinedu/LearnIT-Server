import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import swaggerDefinition from '../../doc/api-specification';
import authRoute from './auth';
import userRoute from './user';

const specs = swaggerJsDoc(swaggerDefinition);
const router = express.Router();
const prefix = '/api/v1';
const apiDocs = '/api/docs';
const specsConfig = setup(specs, {
  explorer: false,
  customSiteTitle: 'LearnIT',
});

router.use(apiDocs, serve);
router.use(apiDocs, specsConfig);
router.use(prefix, authRoute);
router.use(prefix, userRoute);

export default router;
