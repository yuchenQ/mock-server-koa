module.exports = {
  method: 'POST',
  path: '/reset-count',
  requestProps: {
    body: {
      count$: 'Number',
    },
  },
};
