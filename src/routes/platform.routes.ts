import {health} from '../controllers/platform.controller';
import {RouteConfig} from '../util/route.factory';
import RouteFactory from '../util/route.factory';

const platformRoutes: RouteConfig[] = [{
  handler: health,
  method: 'get',
  path: '/health',
}]

const router = new RouteFactory();
router.registerRoutes(platformRoutes);

export default router.getRouter();
