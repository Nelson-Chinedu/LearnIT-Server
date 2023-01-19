export const Enroll = {
  type: 'object',
  properties: {
    status: {
      type: 'number',
      example: 201,
    },
    message: {
      type: 'string',
      example: 'Enrolled successfully',
    },
    payload: {
      type: 'object',
      properties: {
        profile: {
          type: 'uuid',
          example: '04d06bc4-b9c4-469d-837e-d75fb6852913',
        },
        course: {
          type: 'uuid',
          example: '04d06bc4-b9c4-469d-837e-d75fb6852301',
        },
        id: {
          type: 'uuid',
          example: '04d06bc4-b9c4-469d-837e-d75fb68529201',
        },
      },
    },
  },
};
