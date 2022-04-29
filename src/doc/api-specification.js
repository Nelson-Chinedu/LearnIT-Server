import { resolve } from 'path';

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
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: 'http',
    //       scheme: 'bearer',
    //       bearerFormat: 'JWT',
    //     },
    //   },
    // },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:8080/api/v1`,
        description: 'Local Host',
      },
    ],
  },
  apis: [resolve(__dirname, '../routes/api/*.ts')],
};

export default options;
