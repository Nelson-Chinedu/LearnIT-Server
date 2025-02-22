import express from 'express';

import addResource from '../../controller/addResource';
// import getResource from '../../controller/getResource';
import getAllResource from '../../controller/getAllResource';
import editResource from '../../controller/editResource';

import { authentication } from '../../middlewares/authentication';

const router = express.Router();

/**
 * @swagger
 *  paths:
 *    /resources/{id}/:
 *      get:
 *        tags:
 *          - resources
 *        description: Get resources
 *        summary: Fetch user resources passing user ID
 *        parameters:
 *          - in: path
 *            name: id
 *            description: User ID
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *        responses:
 *          200:
 *            description: Successfull
 *          401:
 *            description: Unauthorized
 */
router.get('/resources/:id/', authentication, getAllResource);

/**
 * @swagger
 *  paths:
 *    /resources/{id}/:
 *      post:
 *        tags:
 *          - resources
 *        description: Get resources
 *        summary: Add resource to a category passing user ID
 *        parameters:
 *          - in: path
 *            name: id
 *            description: User ID
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resource'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/Resources'
 *        responses:
 *          201:
 *            description: Resource added successfully
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ResourceResponse'
 *          401:
 *            description: Unauthorized
 *          400:
 *            description: Bad request
 */
router.post('/resources/:id/', authentication, addResource);

router.put('/resources/:id/', authentication, editResource);

export default router;
