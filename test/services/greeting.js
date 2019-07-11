export default {
  method: 'GET',
  path: '/greeting',
  request: {
    query: {
      name: 'String',
    },
  },
  response: {
    body: {
      message: 'Good day!',
    },
  },
};
