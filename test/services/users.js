export default {
  method: 'POST',
  path: '/users',
  handler: (ctx) => {
    const { foo } = ctx.request.body;

    if (foo && foo === 'bar') {
      ctx.status = 400;

      ctx.body = {
        errors: [{
          name: 'GO_AWAY',
          message: 'I don\'t like foo === bar',
        }],
      };

      return;
    }

    ctx.body = ctx.request.body;
  },
};
