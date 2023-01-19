export const Signup = {
  required: ['firstname', 'lastname', 'email', 'password', 'role'],
  type: 'object',
  properties: {
    firstname: {
      type: 'string',
      example: 'John',
    },
    lastname: {
      type: 'string',
      example: 'doe',
    },
    email: {
      type: 'string',
      example: 'john@email.com',
    },
    password: {
      type: 'string',
      example: 'johndoe12',
    },
    role: {
      type: 'string',
      enum: ['mentee', 'mentor'],
    },
  },
};
