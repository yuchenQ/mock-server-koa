export default {
  method: 'GET',
  path: '/blogs',
  request: {
    query: {
      pageNumber: 'String',
      pageSize: 'String',
      search$: 'String',
    },
  },
};
