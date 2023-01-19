export const Resource = {
  type: 'object',
  required: [],
  properties: {
    categoryId: {
      type: 'uuid',
      example: '04d06bc4-b9c4-469d-837e-d75fb6852913',
    },
    name: {
      type: 'string',
      example: 'How to setup an application',
    },
    url: {
      type: 'string',
      example: 'https://www.nelsonchinedu.com',
    },
  },
};

export const ResourceResponse = {
  type: 'object',
  properties: {
    status: {
      type: 'number',
      example: 201,
    },
    message: {
      type: 'string',
      example: 'Resource added successfully',
    },
    payload: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'How to setup an application',
        },
        url: {
          type: 'string',
          example: 'https://www.nelsonchinedu.com',
        },
        profile: {
          type: 'string',
          example: 'cc68fa15-9522-44b8-862f-52e8f5b2ef2c',
        },
      },
    },
  },
};
