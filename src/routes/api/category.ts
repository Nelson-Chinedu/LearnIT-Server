import express from 'express';

import addCategory from '../../controller/addCategory';
import getAllCategory from '../../controller/getAllCategory';

import { authentication } from '../../middlewares/authentication';

const router = express.Router();

/**
 * @swagger
 *  paths:
 *    /category/{id}/:
 *      post:
 *        tags:
 *          - category
 *        description: create category
 *        summary: Creates a new category
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *            description: User ID
 *        requestBody:
 *          required: true
 *          description: Add new category
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 *            application/x-www-form-urlencoded:
 *                $ref: '#/components/schemas/Category'
 *        responses:
 *          201:
 *            description: Successfull
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CategoryResponse'
 *
 */
router.post('/category/:id/', authentication, addCategory);

/**
 * @swagger
 *  paths:
 *    /category/{id}/:
 *      get:
 *        tags:
 *          - category
 *        description: Get category
 *        summary: Fetch user categories passing user ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *            description: User ID
 *        responses:
 *          200:
 *            description: Successfull
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: number
 *                      default: 200
 *                    message:
 *                      type: string
 *                      default: successfull
 *                    payload:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          default: cc68fa15-9522-44b8-862f-52e8f5b2ef2c
 *                        name:
 *                          type: string
 *                          default: How to setup an application
 *
 *          401:
 *            description: Unauthorized
 */
router.get('/category/:id/', authentication, getAllCategory);

export default router;
