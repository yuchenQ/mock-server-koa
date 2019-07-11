import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaQs from 'koa-qs';
import addServicesToRoutes from './addServicesToRoutes';

export default async (servicesDir) => {
  const app = new Koa();
  const router = new Router();

  await addServicesToRoutes(router)(servicesDir);

  app
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(ctx => console.error(`The PATH: ${ctx.path} is missing!`));

  return koaQs(app, 'extended');
};
