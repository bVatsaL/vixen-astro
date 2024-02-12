// import { LRUCache } from 'lru-cache';


// const lruCache = new LRUCache({
//   max: 500,

//   // for use with tracking overall storage size
//   maxSize: 5000,
//   sizeCalculation: () => {
//     return 1
//   },
// });

// export const cache = {
//   //@ts-ignore
//   get: async <T = any>(id: string): Promise<T | undefined> => {
//     const data = lruCache.get(id) as string;
//     return JSON.parse(data);
//   },
//   set: async <T = any>(id: string, data: T, options?: { ttl: number }): Promise<void> => {
//     await lruCache.set(id, JSON.stringify(data), { ttl: options?.ttl });
//   },
//   has: async (id: string): Promise<Boolean> => lruCache.has(id),
//   del: async (id: string): Promise<void> => {
//     await lruCache.delete(id);
//   },
//   clear: async (): Promise<void> => {
//     await lruCache.clear();
//   },
// };

// export const getCache = async () => cache;
