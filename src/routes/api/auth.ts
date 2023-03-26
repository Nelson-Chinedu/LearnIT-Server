import express from 'express';

import signupController from '../../controller/signup';
import signinController from '../../controller/signin';
import getProfileController from '../../controller/getProfile';
import verifyEmailController from '../../controller/verifyEmail';
import logoutController from '../../controller/logout';

import signupValidator from '../../validation/signup';
import signinValidator from '../../validation/signin';

import UserMiddleware from '../../middlewares/UserMiddleware';
import { authentication } from '../../middlewares/authentication';

const router = express.Router();

/**
 * @swagger
 *
 *  paths:
 *    /auth/signup/:
 *      post:
 *        tags:
 *          - auth
 *        security: []
 *        summary: Creates a new user
 *        description: Creates a new user by role using either the listed enum
 *        requestBody:
 *          required: true
 *          description: creates a new user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Signup'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/Signup'
 *        responses:
 *          201:
 *            description: Account created
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: number
 *                      default: 201
 *                    message:
 *                      type: string
 *                      default: Account created successfully
 *                    payload:
 *                      type: object
 *                      properties:
 *                        role:
 *                          type: string
 *                          default: mentee
 *                        token:
 *                          type: string
 *                          default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9jkfkj.DFkkek.eyJhbGciOiJIUzI1NiIsInR5cCI6Ik
 *          400:
 *            description: Bad request
 *          409:
 *            description: Conflict
 */
router.post(
  '/auth/signup/',
  signupValidator,
  UserMiddleware.findEmail,
  signupController
);

/**
 * @swagger
 *
 *  paths:
 *    /auth/signin/:
 *      post:
 *        tags:
 *          - auth
 *        security: []
 *        description: Logs existing user
 *        summary: Logs existing user with crendential
 *        requestBody:
 *          required: true
 *          description: authenticate if user exist
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Signin'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/Signin'
 *        responses:
 *          200:
 *            description: Logged in successfully
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
 *                      default: Logged in successfully
 *                    payload:
 *                      type: object
 *                      properties:
 *                        role:
 *                          type: string
 *                          default: mentee
 *                        token:
 *                          type: string
 *                          default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9jkfkj.DFkkek.eyJhbGciOiJIUzI1NiIsInR5cCI6Ik
 *          400:
 *            description: Bad request
 *          404:
 *            description: Not found
 */
router.post(
  '/auth/signin/',
  signinValidator,
  UserMiddleware.findUser,
  signinController
);

/**
 * @swagger
 *
 *  paths:
 *    /auth/verify/:
 *      post:
 *        tags:
 *          - auth
 *        security: []
 *        description: Verify user
 *        summary: Verify new user email address
 *        requestBody:
 *          required: true
 *          description: verify email if user exist
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                required: [token]
 *                properties:
 *                  token:
 *                    type: string
 *        responses:
 *          200:
 *            description:
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
 *                      default: Email verified, proceed to login
 *                    payload:
 *                      type: object
 *          400:
 *            description: Something went wrong
 *          404:
 *            description: Not found
 */
router.post('/auth/verify/', verifyEmailController);

/**
 * @swagger
 *
 *  paths:
 *    /auth/user/:
 *      get:
 *        tags:
 *          - auth
 *        description: authenticated user detail
 *        summary: Fetch current logged in user detail
 *        responses:
 *          200:
 *            description: user details
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Profile'
 *          401:
 *            description: Unauthorized
 */
router.get('/auth/user/', authentication, getProfileController);

router.post('/auth/logout/', authentication, logoutController);

export default router;
