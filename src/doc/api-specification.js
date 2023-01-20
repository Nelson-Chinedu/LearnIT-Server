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
        url: `http://localhost:8080/api/v1`,
        description: 'Dev',
      },
      {
        url: `https://learnit-prod.onrender.com/api/v1`,
        description: 'Test',
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
  // apis: [resolve(__dirname, '/routes/api/*.ts')],
  apis: 'build/routes/api/*.js',
};

console.log(resolve(__dirname, '/routes/api'), 'DIR');

export default options;
