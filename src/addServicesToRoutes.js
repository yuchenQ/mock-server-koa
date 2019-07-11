import fs from 'fs-extra';
import path from 'path';
import propsMatch from './helper/propsMatch';

const addServicesToRoutes = router => async (directory) => {
  const files = await fs.readdir(directory);

  files.forEach(async (file) => {
    const thisPath = path.join(directory, file);
    const stat = await fs.stat(thisPath);

    if (stat.isDirectory()) {
      await addServicesToRoutes(router)(thisPath);
      return;
    }

    // eslint-disable-next-line import/no-dynamic-require, global-require
    let module = require(thisPath);

    if (module.default) {
      module = module.default;
    }

    const {
      method,
      path: actionPath,
      request = {},
      response: { body, status = 200 } = {},
      handler,
    } = module;

    console.log(method, actionPath);

    router[method.toLowerCase()](actionPath, async (ctx, next) => {
      if (handler) {
        await handler(ctx, next);

        return;
      }

      const { body: requestBody, query: requestQuery } = request;

      if (!requestBody && !requestQuery) {
        ctx.status = status;
        ctx.body = body;

        return;
      }

      if (
        (requestBody && !propsMatch(requestBody, ctx.request.body))
        || (requestQuery && !propsMatch(requestQuery, ctx.request.query))
      ) {
        ctx.status = 500;
        ctx.body = {
          message: `${actionPath} DOES NOT MATCH`,
          ...({
            [[true, true]]: {
              expectedBody: requestBody,
              receivedBody: ctx.request.body,
              expectedQuery: requestQuery,
              receivedQuery: ctx.request.query,
            },
            [[false, true]]: {
              expectedQuery: requestQuery,
              receivedQuery: ctx.request.query,
            },
            [[true, false]]: {
              expectedBody: requestBody,
              receivedBody: ctx.request.body,
            },
          }[[requestBody, requestQuery]]),
        };

        return;
      }

      ctx.status = status;
      ctx.body = body;
    });
  });
};

export default addServicesToRoutes;
