export default {
  method: 'POST',
  path: '/error',
  request: {
    body: {
      error: {
        name: 'String',
      },
    },
  },
  response: {
    status: 409,
  },
};
