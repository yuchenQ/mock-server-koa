export default {
  method: 'POST',
  path: '/admins',
  request: {
    body: {
      admin: {
        email: 'String',
        roles: 'Array',
      },
    },
  },
};
