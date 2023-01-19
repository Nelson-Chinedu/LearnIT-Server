export const EnrollCourseDetail = {
  type: 'object',
  properties: {
    status: {
      type: 'number',
      example: 200,
    },
    message: {
      type: 'string',
      example: 'Course detail',
    },
    payload: {
      type: 'object',
      properties: {
        id: {
          type: 'uuid',
          example: '04d06bc4-b9c4-469d-837e-d75fb6852913',
        },
        name: {
          type: 'string',
          example: 'Intro learning',
        },
        price: {
          type: 'string',
          example: '2000',
        },
        thumbnail: {
          type: 'string',
          example:
            'https://res.cloudinary.com/dbx3dert2/image/upload/v16729302310/LearnIT/thumbnail/image-057f0221-2292-4bcd-b75e-b901a545ui902.jpg',
        },
        preview: {
          type: 'string',
          example:
            'https://res.cloudinary.com/dbx3dert2/image/upload/v16729302310/LearnIT/thumbnail/image-057f0221-2292-4bcd-b75e-b901a545ui902.jpg',
        },
        objectives: {
          type: 'string',
          example: '<p>some objective to note as well here and there<br></p>',
        },
        faq: {
          type: 'string',
          example: '<p>some faq to note as well here and there<br></p>',
        },
        firstname: {
          type: 'string',
          example: 'Smauel',
        },
        lastname: {
          type: 'string',
          example: 'Larry',
        },
      },
    },
  },
};
