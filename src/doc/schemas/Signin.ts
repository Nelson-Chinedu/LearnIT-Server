export const Signin = {
  required: ['email', 'password'],
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'john@email.com',
    },
    password: {
      type: 'string',
      example: 'johndoe12',
    },
  },
};
