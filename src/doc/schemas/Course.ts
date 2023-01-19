export const Course = {
  type: 'object',
  required: [
    'course_name',
    'price',
    'video_url',
    'course_thumbnail',
    'course_preview',
    'course_faq',
    'course_objective',
  ],
  properties: {
    course_name: {
      type: 'string',
      example: 'Intro learning',
    },
    price: {
      type: 'string',
      example: '2000',
    },
    video_url: {
      type: 'array',
      example: [
        'https://res.cloudinary.com/dbx3dhwsq/video/upload/v1672390123/LearnIT/video-40152b81-1d2b-4cb7-a15f-24335bcdsdlo2.mp4',
        'https://res.cloudinary.com/dbx3dhedr/video/upload/v1679019293/LearnIT/video-40152b81-1d2b-4cb7-a15f-24335bcd43ed.mp4',
      ],
    },
    course_thumbnail: {
      type: 'string',
      example:
        'https://res.cloudinary.com/dbx3dert2/image/upload/v16729302310/LearnIT/thumbnail/image-057f0221-2292-4bcd-b75e-b901a545ui902.jpg',
    },
    course_preview: {
      type: 'string',
      example:
        'https://res.cloudinary.com/dbx3dhjk12/video/upload/v167293023p1/LearnIT/video-b0c8f44a-2ad4-47b6-b7ca-dee036473410.mp4',
    },
    course_faq: {
      type: 'string',
      example: '<p>some faq to note as well here and there<br></p>',
    },
    course_objective: {
      type: 'string',
      example: '<p>some objective to note as well here and there<br></p>',
    },
  },
};

export const CourseResponse = {
  type: 'object',
  properties: {
    status: {
      type: 'number',
      example: 201,
    },
    message: {
      type: 'string',
      example: 'Course created successfully',
    },
    payload: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'cc68fa15-9522-44b8-862f-52e8f5b2ef2c',
        },
        name: {
          type: 'string',
          example: 'Intro to web',
        },
        price: {
          type: 'string',
          default: '2000',
        },
        count: {
          type: 'number',
          example: 20,
        },
        video: {
          type: 'array',
          example: [
            'https://res.cloudinary.com/dbx3dhwsq/video/upload/v1672390123/LearnIT/video-40152b81-1d2b-4cb7-a15f-24335bcdsdlo2.mp4',
            'https://res.cloudinary.com/dbx3dhedr/video/upload/v1679019293/LearnIT/video-40152b81-1d2b-4cb7-a15f-24335bcd43ed.mp4',
          ],
        },
        thumbnail: {
          type: 'string',
          example:
            'https://res.cloudinary.com/dbx/image/upload/v16740/LearnIT/thumbnail/image-da4ebc-b896-1587.jpg',
        },
        preview: {
          type: 'string',
          example:
            'https://res.cloudinary.com/dbx3/video/upload/v1673/LearnIT/video-a5ca82e4-799c118.mp4',
        },
        objectives: {
          type: 'string',
          example: '<p>some objective to note as well here and there<br></p>',
        },
        faq: {
          type: 'string',
          example: '<p>some faq to note as well here and there<br></p>',
        },
        account: {
          type: 'string',
          example: 'cc68fa15-9522-44b8-862f-52e8f5b2ef2c',
        },
        profile: {
          type: 'string',
          example: 'cc68fa15-9522-44b8-862f-52e8f5b2ef2c',
        },
      },
    },
  },
};
