import express from 'express';

import getProfileController from '../../controller/getProfile';
import updateBio from '../../controller/updateBio';
import updateProfile from '../../controller/updateProfile';
import addCourse from '../../controller/addCourse';
import getCourses from '../../controller/getCourses';
import videoUpload from '../../controller/videoUpload';
import getAllCourses from '../../controller/getAllCourses';
import getBioController from '../../controller/getBio';
import addCategory from '../../controller/addCategory';
import getAllCategory from '../../controller/getAllCategory';
import addResource from '../../controller/addResource';
import getAllResource from '../../controller/getAllResource';
import imageUpload from '../../controller/imageUpload';

import { authentication } from '../../middlewares/authentication';
import UserMiddleware from '../../middlewares/UserMiddleware';

import profileValidator from '../../validation/profile';
import mentorBioValidator from '../../validation/mentorBio';
import courseValidator from '../../validation/course';

const router = express.Router();

/**
 * @swagger
 *
 * /user/me:
 *  get:
 *    summary: User profile
 *    description: Get user profile
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: user profile
 *      401:
 *        description: unauthorized
 */
router.get('/user/me', authentication, getProfileController);

/**
 * @swagger
 *
 * /user/me:
 *  put:
 *    summary: User profile
 *    description: Update user profile
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstname:
 *                type: string
 *              lastname:
 *                 type: string
 *              phone:
 *                 type: string
 *              city:
 *                 type: string
 *              state:
 *                 type: string
 *              zipCode:
 *                 type: string
 *              address:
 *                 type: string
 *              country:
 *                 type: string
 *    responses:
 *      204:
 *        description: successfull
 *      401:
 *        description: unauthorized
 *      400:
 *        description: bad request
 */
router.put('/user/me', authentication, profileValidator, updateProfile);

/**
 * @swagger
 *
 * /user/me/bio:
 *  put:
 *    summary: User bio
 *    description: update user bio
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              mentorBio:
 *                type: string
 *    responses:
 *      204:
 *        description: successfull
 *      401:
 *        description: unauthorized
 *      400:
 *        description: bad request
 *      403:
 *        description: forbidden
 *
 */
router.put(
  '/user/me/bio',
  authentication,
  UserMiddleware.findRole,
  mentorBioValidator,
  updateBio
);

/**
 * @swagger
 *  /user/me/bio:
 *    get:
 *      summary: user bio
 *      description: get user bio
 *      tags:
 *        - Users
 *      responses:
 *        200:
 *          description: user bio
 *        403:
 *          description: forbidden
 *        401:
 *          description: unauthorized
 *        400:
 *          description: error
 */
router.get(
  '/user/me/bio',
  authentication,
  UserMiddleware.findRole,
  getBioController
);

/**
 * @swagger
 *
 * /upload/video:
 *  post:
 *    summary: course video
 *    description: user (mentor) can upload course video
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              video:
 *                type: string
 *                format: binary
 *    produces:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: number
 *            message:
 *              type: string
 *            payload:
 *              type: object
 *              properties:
 *                url:
 *                  type: string
 *    responses:
 *      201:
 *        description: successfull
 *      403:
 *        description: forbidden
 *      401:
 *        description: unauthorized
 */
router.post(
  '/upload/video',
  authentication,
  UserMiddleware.findRole,
  videoUpload
);

/**
 * @swagger
 *
 * /add/course:
 *  post:
 *    summary: add course
 *    description: user (mentor) can add course
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              course_name:
 *                type: string
 *              price:
 *                type: string
 *              video_url:
 *                type: array
 *                items:
 *                  type: string
 *    produces:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: number
 *            message:
 *              type: string
 *            payload:
 *              type: object
 *    responses:
 *      201:
 *        description: successfull
 *      401:
 *        description: unauthorized
 *      403:
 *        description: forbidden
 *      400:
 *        description: bad request
 */
router.post(
  '/add/course',
  authentication,
  UserMiddleware.findRole,
  courseValidator,
  addCourse
);

/**
 * @swagger
 *
 * /courses:
 *  get:
 *    summary: User course
 *    description: Get user list of course
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: User course
 *      401:
 *        description: unauthorized
 */
router.get('/courses', authentication, UserMiddleware.findRole, getCourses);

router.post('/category', authentication, addCategory);

router.get('/category/all', authentication, getAllCategory);

router.post('/resource', authentication, addResource);

/**
 * @swagger
 *
 * /resource/all:
 *  get:
 *    summary: User resource on category
 *    description: Get list of category resource
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: User resource
 *      401:
 *        description: unauthorized
 */
router.get('/resource/all', authentication, getAllResource);

/**
 * @swagger
 *
 * /course:
 *  get:
 *    summary:  course
 *    description: Get all list of courses
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: User course
 *      404:
 *        description: not found
 */
router.get('/courses/all', getAllCourses);

router.patch('/user/profile', authentication, imageUpload);

export default router;
