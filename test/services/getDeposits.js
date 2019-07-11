export default {
  method: 'GET',
  path: '/deposits',
  request: {
    query: {
      filter: {
        where: {
          state: {
            inq: 'Array',
          },
        },
      },
    },
  },
  response: {
    body: {
      deposits: [],
    },
  },
};
