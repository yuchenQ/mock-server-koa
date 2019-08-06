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

    let module = await import(thisPath);

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
        ctx.body = body;
        ctx.status = status;

        return;
      }

      if (
        (requestBody && !propsMatch(requestBody, ctx.request.body))
        || (requestQuery && !propsMatch(requestQuery, ctx.request.query))
      ) {
        const errorDescription = {
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
        }[[!!requestBody, !!requestQuery]];

        const error = {
          message: `${actionPath} DOES NOT MATCH`,
          ...errorDescription,
        };

        ctx.body = error;
        ctx.status = 500;

        console.error(error);

        return;
      }

      ctx.body = body;
      ctx.status = status;
    });
  });
};

export default addServicesToRoutes;
