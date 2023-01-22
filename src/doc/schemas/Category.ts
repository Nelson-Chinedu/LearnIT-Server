export const Category = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      example: 'blog',
    },
  },
};

export const CategoryResponse = {
  type: 'object',
  properties: {
    status: {
      type: 'number',
      example: 201,
    },
    message: {
      type: 'string',
      example: 'Category created succesfully',
    },
    payload: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'blog',
        },
        profile: {
          type: 'string',
          example: '47fd1ca0-dd7e-483e-80fb-d807616aea40',
        },
        id: {
          type: 'string',
          example: '47fd1ca0-dd7e-483e-80fb-d807616aea40',
        },
      },
    },
  },
};
