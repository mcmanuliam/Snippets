import {authenticated} from '../util/middleware/authenticated';
import {action, create, find, findById, update} from '../controllers/snippets.controller';
import {RouteConfig} from '../util/route.factory';
import RouteFactory from '../util/route.factory';

const snippetRoutes: RouteConfig[] = [
  {
    handler: find,
    method: 'get',
    path: '/',
  },
  {
    handler: findById,
    method: 'get',
    path: '/:id',
  },
  {
    handler: update,
    method: 'put',
    middlewares: [authenticated],
    path: '/:id',
  },
  {
    handler: action,
    method: 'put',
    middlewares: [authenticated],
    path: '/:id/:action',
  },
  {
    handler: create,
    method: 'post',
    middlewares: [authenticated],
    path: '/',
  },
];

const router = new RouteFactory();
router.registerRoutes(snippetRoutes);

export default router.getRouter();
