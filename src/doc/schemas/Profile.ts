export const Profile = {
  type: 'object',
  properties: {
    status: {
      type: 'number',
      example: 200,
    },
    message: {
      type: 'string',
      example: 'User details',
    },
    payload: {
      type: 'object',
      properties: {
        id: {
          type: 'uuid',
          example: '04d06bc4-b9c4-469d-837e-d75fb6852913',
        },
        email: {
          type: 'string',
          example: 'john@email.com',
        },
        role: {
          type: 'string',
          enum: ['mentee', 'mentor'],
        },
        firstname: {
          type: 'string',
          example: 'john',
        },
        lastname: {
          type: 'string',
          example: 'doe',
        },
        phone: {
          type: 'string',
          example: '09089330293',
        },
        city: {
          type: 'string',
          example: 'remote',
        },
        state: {
          type: 'string',
          example: 'worldwide',
        },
        zipCode: {
          type: 'string',
          example: '102332',
        },
        address: {
          type: 'string',
          example: 'remote worldwide',
        },
        country: {
          type: 'string',
          example: 'anywhere',
        },
        picture: {
          type: 'string',
          example:
            'https://res.cloudinary.com/dbx3dhfkt/image/upload/v1672045944/LearnIT/pictures/image-5a9482cd3-a97e-4627-dbc3-9cb53797e40a.png"',
        },
      },
    },
  },
};
