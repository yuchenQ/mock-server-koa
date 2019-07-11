module.exports = {
  method: 'POST',
  path: '/reset-count',
  request: {
    body: {
      count$: 'Number',
    },
  },
};
