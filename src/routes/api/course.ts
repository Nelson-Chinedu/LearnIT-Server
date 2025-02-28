import express from 'express';

import addCourse from '../../controller/Course/add-course.controller';
import getCourses from '../../controller/Course/get-courses.controller';
import videoUpload from '../../controller/Upload/video-upload.controller';
import thumbnailUpload from '../../controller/Upload/thumbnail-upload.controller';
import getAllCourses from '../../controller/Course/get-all-courses.controller';
import enrollCourse from '../../controller/Course/enroll-course.controller';
import getEnrolledCourse from '../../controller/Course/get-enrolled-course.controller';
import unenrollCourse from '../../controller/Course/unenroll-Course.controller';
import getEnrollCourseDetailController from '../../controller/Course/get-enroll-course-detail.controller';

import { authentication } from '../../middlewares/authentication';
import UserMiddleware from '../../middlewares/UserMiddleware';

import courseValidator from '../../validation/course';

const router = express.Router();

/**
 * @swagger
 *  paths:
 *    /courses/:
 *      post:
 *        tags:
 *          - courses
 *        description: User (mentor) add course
 *        summary: Creates a new course (Mentor)
 *        requestBody:
 *          required: true
 *          description: creates new course
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Course'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/Course'
 *        responses:
 *          201:
 *            description: Course created successfully
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CourseResponse'
 *          400:
 *            description: Bad request
 *          401:
 *            description: Unauthorized
 *          403:
 *            description: Forbidden
 */
router.post(
  '/courses/',
  authentication,
  UserMiddleware.findRole,
  courseValidator,
  addCourse
);

/**
 * @swagger
 *  paths:
 *    /courses/video/:
 *      post:
 *        tags:
 *          - courses
 *        description: User (mentor) upload video
 *        summary: Upload course video (Mentor)
 *        requestBody:
 *          required: true
 *          description: Upload video course
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                required: [video]
 *                properties:
 *                  video:
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
 *                      default: Video uploaded successfully
 *                    payload:
 *                      type: object
 *                      properties:
 *                        url:
 *                          type: string
 *                          default:
 *                            https://res.cloudinary.com/fbxu/video/upload/v167401/LearnIT/video-1aa510-40df-bf10.mp4
 *          400:
 *            description: Bad request
 *          401:
 *            description: Unauthorized
 *          403:
 *            description: Forbidden
 */
router.post(
  '/courses/video/',
  authentication,
  UserMiddleware.findRole,
  videoUpload
);

/**
 * @swagger
 *  paths:
 *    /courses/thumbnail/:
 *      post:
 *        tags:
 *          - courses
 *        description: Course thumbanil
 *        summary: Upload course thumbnail (Mentor)
 *        requestBody:
 *          required: true
 *          description: upload course thumbnail
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
 *            description: Uploaded
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
 *                      default: Thumbnail uploaded successfully
 *                    payload:
 *                      type: object
 *                      properties:
 *                        url:
 *                          type: string
 *                          default:
 *                            https://res.cloudinary.com/dbx/image/upload/v16/LearnIT/thumbnail/image-158743.jpg
 *          400:
 *            description: Bad request
 *          401:
 *            description: Unauthorized
 *          403:
 *            description: Forbidden
 */
router.post(
  '/courses/thumbnail/',
  authentication,
  UserMiddleware.findRole,
  thumbnailUpload
);

/**
 * @swagger
 *
 * paths:
 *  /courses/all/:
 *    get:
 *      tags:
 *        - courses
 *      security: []
 *      description: Get public courses
 *      summary: Fetch all courses
 *      responses:
 *        200:
 *          description: Successfull
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                    default: 200
 *                  message:
 *                    type: string
 *                    default: Successfull
 *                  payload:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                          default: Intro to learning
 *                        price:
 *                          type: string
 *                          default: 2000
 *                        count:
 *                          type: number
 *                          default: 1
 *        400:
 *          description: Bad request
 *
 */
router.get('/courses/all/', getAllCourses);

/**
 * @swagger
 *  paths:
 *    /courses/{id}/:
 *      get:
 *        tags:
 *          - courses
 *        description: Get private courses
 *        summary: Fetch user (Mentor) specific added courses
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: User ID
 *            schema:
 *              type: string
 *              format: uuid
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
 *                      default: Successfull
 *                    payload:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          name:
 *                            type: string
 *                            default: Intro to learning
 *                          price:
 *                            type: string
 *                            default: 2000
 *                          count:
 *                            type: number
 *                            default: 1
 *          401:
 *            description: Unauthorized
 *          403:
 *            description: Forbidden
 *
 */
router.get(
  '/courses/:id/',
  authentication,
  UserMiddleware.findRole,
  getCourses
);

/**
 * @swagger
 *  paths:
 *    /courses/{id}/enroll/:
 *      get:
 *        tags:
 *          - courses
 *        description: User enrolled courses
 *        summary: Fetch enrolled courses using user ID
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
 */
router.get('/courses/:id/enroll/', authentication, getEnrolledCourse);

/**
 * @swagger
 *  paths:
 *    /courses/{id}/unenroll/{courseId}:
 *      delete:
 *        tags:
 *          - courses
 *        description: Unenroll from a course
 *        summary: Unenroll from a course by passing user ID and course ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *            description: User ID
 *          - in: path
 *            name: courseId
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *            description: Course ID
 *        responses:
 *          204:
 *            description: Unenrolled successfully
 *          401:
 *            description: Unauthorized
 *          400:
 *            description: Bad request
 *          404:
 *            description: Not found
 */
router.delete(
  '/courses/:id/unenroll/:courseId/',
  authentication,
  unenrollCourse
);

/**
 * @swagger
 *  paths:
 *    /courses/{id}/enroll/{courseId}/:
 *      post:
 *        tags:
 *          - courses
 *        description: Enroll for a course
 *        summary: Enroll for a course passing user ID and course ID
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *            description: User ID
 *          - in: path
 *            name: courseId
 *            required: true
 *            schema:
 *              type: string
 *              format: uuid
 *            description: Course ID
 *        responses:
 *          201:
 *            description: Enrolled successfully
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Enroll'
 *          400:
 *            description: Bad request
 *          401:
 *            description: Unauthorized
 */
router.post('/courses/:id/enroll/:courseId/', authentication, enrollCourse);

/**
 * @swagger
 *
 * paths:
 *  /courses/{id}/enroll/{courseId}/:
 *    get:
 *      tags:
 *        - courses
 *      description: View enroll course detail
 *      summary: Fetch specific enrolled course detail passing user ID and course ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            format: uuid
 *          description: User ID
 *        - in: path
 *          name: courseId
 *          required: true
 *          schema:
 *            type: string
 *            format: uuid
 *          description: Course ID
 *      responses:
 *        200:
 *          description: Successfull
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/EnrollCourseDetail'
 *        404:
 *          description: Not found
 *        401:
 *          description: Unauthorized
 *        400:
 *          description: Bad request
 */
router.get(
  '/courses/:id/enroll/:courseId/',
  authentication,
  getEnrollCourseDetailController
);

export default router;
