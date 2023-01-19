export const BasicUser = {
  type: 'object',
  properties: {
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
      example: '0902390123',
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
      example: '102291',
    },
    address: {
      type: 'string',
      example: 'remote worldwide',
    },
    country: {
      type: 'string',
      example: 'anywhere',
    },
  },
};
