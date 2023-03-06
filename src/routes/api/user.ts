import express from 'express';

import updateBio from '../../controller/updateBio';
import updateProfile from '../../controller/updateProfile';
import getBioController from '../../controller/getBio';
import imageUpload from '../../controller/imageUpload';

import { authentication } from '../../middlewares/authentication';
import UserMiddleware from '../../middlewares/UserMiddleware';

import profileValidator from '../../validation/profile';
import mentorBioValidator from '../../validation/mentorBio';
import verifyPaymentController from '../../controller/verifyPaymentController';
import getAllMentorsController from '../../controller/getAllMentors';
import getMentorsController from '../../controller/getMentorsController';

const router = express.Router();

/**
 * @swagger
 *
 *  paths:
 *    /users/{id}/:
 *      put:
 *        tags:
 *          - users
 *        description: update user profile
 *        summary: Update an existing user detail with user ID
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              format: uuid
 *            required: true
 *            description: user ID
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BasicUser'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/BasicUser'
 *        responses:
 *          204:
 *            description: Profile updated successfully
 *          400:
 *            description: Bad Request
 *          401:
 *            description: Unauthorized
 */
router.put('/users/:id/', authentication, profileValidator, updateProfile);

/**
 * @swagger
 *
 *  paths:
 *    /users/{id}/bio/:
 *      put:
 *        tags:
 *          - users
 *        description: Update user (Mentor) bio
 *        summary: Update an existing user (Mentor) bio description using user ID
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              format: uuid
 *            required: true
 *            description: user ID
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Bio'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/Bio'
 *        responses:
 *          204:
 *            description: Bio updated successfully
 *          400:
 *            description: Bad request
 *          401:
 *            description: Unauthorized
 *          403:
 *            description: Forbidden
 *
 */
router.put(
  '/users/:id/bio/',
  authentication,
  UserMiddleware.findRole,
  mentorBioValidator,
  updateBio
);

/**
 * @swagger
 *
 *  paths:
 *    /users/{id}/bio:
 *      get:
 *        tags:
 *          - users
 *        description: User (Mentor) bio detail
 *        summary: Fetch existing user (Mentor) bio description using user ID
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              format: uuid
 *            required: true
 *            description: User ID
 *        responses:
 *          200:
 *            description: Successful
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
 *                      default: Bio detail
 *                    payload:
 *                      type: object
 *                      properties:
 *                        bio:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: string
 *                              default: 8d78926c-dc5a-42ab-b860-509e8d805944
 *                            mentorBio:
 *                              type: string
 *                              default: Lorem ipsum dolor
 *          400:
 *            description: Bad request
 *          401:
 *            description: Unauthorized
 *          403:
 *            description: Forbidden
 *          404:
 *            description: Not found
 *
 */
router.get(
  '/users/:id/bio/',
  authentication,
  UserMiddleware.findRole,
  getBioController
);

/**
 * @swagger
 *  paths:
 *    /users/{id}/profile/:
 *      patch:
 *        tags:
 *          - users
 *        description: user profile image
 *        summary: Updte user profile image using user ID
 *        parameters:
 *          - in: path
 *            name: id
 *            description: User ID
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *        requestBody:
 *          required: true
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                required: [image]
 *                properties:
 *                  image:
 *                    type: string
 *                    format: binary
 *        responses:
 *          201:
 *            description: Uploaded successfully
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
 *                      default: Image uploaded successfully
 *                    payload:
 *                      type: object
 *                      properties:
 *                        url:
 *                          type: string
 *                          default:
 *                            https://res.cloudinary.com/dbx/image/upload/v167/LearnIT/pictures/image-b5dcb3c3-9f005.png
 *          400:
 *            description: Bad request
 *          401:
 *            description: Unauthorized
 *
 *
 */
router.patch('/users/:id/profile/', authentication, imageUpload);

router.get('/mentors/', authentication, getAllMentorsController);

router.get('/mentors/:id/', authentication, getMentorsController);

export default router;
