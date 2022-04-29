import express from 'express';

import signupController from '../../controller/signup';
import signinController from '../../controller/signin';

import signupValidator from '../../validation/signup';
import signinValidator from '../../validation/signin';

import UserMiddleware from '../../middlewares/UserMiddleware';

const router = express.Router();

/**
 * @swagger
 *
 * /auth/signup:
 *    post:
 *      security: []
 *      summary: User signup
 *      description: Creates a new user account
 *      tags:
 *        - Accounts
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firstname:
 *                  type: string
 *                  default: john
 *                lastname:
 *                  type: string
 *                  default: doe
 *                email:
 *                  type: string
 *                  default: john.doe@email.com
 *                password:
 *                  type: string
 *                  default: johndoeABC
 *                role:
 *                  type: string
 *                  default: mentor
 *      produces:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: number
 *              message:
 *                type: string
 *              payload:
 *                type: object
 *                properties:
 *                  role:
 *                    type: string
 *                  token:
 *                    type: string
 *      responses:
 *        201:
 *          description: Account created
 *        400:
 *          description: Bad request
 *        409:
 *          description: Conflict
 */
router.post(
  '/auth/signup',
  signupValidator,
  UserMiddleware.findEmail,
  signupController
);

/**
 * @swagger
 *
 * /auth/signin:
 *    post:
 *      security: []
 *      summary: User signin
 *      description: Log existing user
 *      tags:
 *        - Accounts
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      produces:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: number
 *              message:
 *                type: string
 *              payload:
 *                type: object
 *                properties:
 *                  role:
 *                    type: string
 *                  token:
 *                    type: string
 *      responses:
 *        200:
 *          description: Ok
 *          schema:
 *            type: object
 *        400:
 *          description: Bad request
 *        404:
 *          description: Not found
 */
router.post(
  '/auth/signin',
  signinValidator,
  UserMiddleware.findUser,
  signinController
);

export default router;
