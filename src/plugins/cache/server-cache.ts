import { RedisFlushModes, createClient } from 'redis';
import { cache as LRUCacheInstance } from './browser-cache';

const isDevelopment = process.env.NODE_ENV === 'development';

// @ts-ignore
const CacheMap = globalThis?.redisCacheMap || new WeakMap();
// @ts-ignore
globalThis.redisCacheMap = CacheMap;

export const getRedisClient = async () => {
  let client: ReturnType<typeof createClient>;
  if (CacheMap.has(globalThis)) {
    client = CacheMap.get(globalThis);
  } else {
    client = createClient({
      url: process.env.REDIS_URL,
    });
    CacheMap.set(globalThis, client);
    try {
      await client.connect();
      console.info('Connected to Redis.');
    } catch (ex) {
      console.error('ERROR:: ', ex);
    }
  }
  return client;
};

const getRedisCache = async () => {
  const client = await getRedisClient();

  return {
    get: async <T = any>(id: string): Promise<T | undefined> => {
      const data = await client.get(id);
      if (typeof data === 'string') {
        return JSON.parse(data);
      }
      return data as T;
    },
    set: async <T = any>(id: string, data: T, options?: { ttl?: number }): Promise<void> => {
      client.set(
        id,
        JSON.stringify(data),
      );
      if (options?.ttl) {
        client.expireAt(id, (Math.floor((+new Date)/1000) + options.ttl / 1000));
      }
    },
    has: async (id: string): Promise<Boolean> => {
      const totalKeys = await client.exists(id);
      return totalKeys > 0;
    },
    del: async (id: string): Promise<void> => {
      await client.del(id);
    },
    clear: async (): Promise<void> => {
      await client.flushAll(RedisFlushModes.ASYNC);
    }
  };
};

export const getCache = async () => {
  if (isDevelopment) {
    return LRUCacheInstance;
  }
  return getRedisCache();
};
