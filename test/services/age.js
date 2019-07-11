export default {
  method: 'PUT',
  path: '/users/:userUuid/age',
  request: {
    body: {
      age: 'Number',
    },
  },
};
