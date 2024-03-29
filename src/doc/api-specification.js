import { resolve } from 'path';

import {
  Category,
  EnrollCourseDetail,
  Signup,
  Signin,
  Profile,
  BasicUser,
  Bio,
  Course,
  Enroll,
  CategoryResponse,
  Resource,
  ResourceResponse,
  CourseResponse,
} from './schemas';

const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.SERVER_URL_DEV
    : process.env.SERVER_URL_PROD;

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'LearnIT',
      version: '1.0.0',
      description: 'API doc for LearnIT',
      license: { name: 'MIT' },
      contact: { name: 'Nelson Chinedu', url: 'https://nelsonchinedu.com' },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Signup,
        Signin,
        Profile,
        BasicUser,
        Bio,
        Course,
        Enroll,
        EnrollCourseDetail,
        Category,
        CategoryResponse,
        Resource,
        ResourceResponse,
        CourseResponse,
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: SERVER_URL,
      },
    ],
    tags: [
      {
        name: 'auth',
        description: 'Authentication endpoint uses cookie for JWT',
      },
      { name: 'users', description: 'Info about loggedIn user' },
      { name: 'courses', description: 'Course info' },
      { name: 'resources', description: 'Resource info' },
      { name: 'category', description: 'Category info' },
    ],
  },
  apis: [
    resolve(__dirname, '../routes/api/*.js'),
    resolve(__dirname, '../routes/api/*.ts'),
  ],
};

export default options;
