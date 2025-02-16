import {platformConfig} from '../config/platform.config';
import {createClient} from 'redis';

export const redisClient = createClient({
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
    tls: platformConfig.redis.tlsEnabled,
  },
  url: platformConfig.redis.uri,
});
