import {current, destroy, findById} from '../controllers/user.controller';
import {authenticated} from '../util/middleware/authenticated';
import {RouteConfig} from '../util/route.factory';
import RouteFactory from '../util/route.factory';

const routes: RouteConfig[] = [
  {
    handler: current,
    method: 'get',
    middlewares: [authenticated],
    path: '/current',
  },
  {
    handler: findById,
    method: 'get',
    middlewares: [authenticated],
    path: '/:id',
  },
  {
    handler: destroy,
    method: 'delete',
    middlewares: [authenticated],
    path: '/',
  },
];

const router = new RouteFactory();
router.registerRoutes(routes);

export default router.getRouter();
