export default {
  method: 'POST',
  path: '/errors',
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
