import { filterData } from '@utils/data.util';
import jsonFetch, { FetchError } from '@utils/json-api.util';
import { type GetRecoilValue, atom } from 'recoil-ssr';
import { getCache } from 'vixen-cache';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashPick from 'lodash/pick';
import { apiEndpointAtom } from './site.atom';
import { hash } from '@utils/hash.util';

export const requestVarsAtom = atom({
  key: 'requestVarsAtom',
  default: {
    getRequestVar: (() => null) as (key: string, defaultValue: any) => any,
    setRequestVar: (() => {}) as (key: string, value: any) => void,
  },
});

export const syncDataAtom = atom({
  key: 'syncDataAtom',
  default: {
    getSyncData: (() => {}) as (key: string) => any,
    setSyncData: (() => {}) as (key: string, value: any) => void,
  },
});

export const cacheAtom = atom({
  key: 'cacheAtom',
  // default: getCache(),
});

function base64Decode(str: string) {
  // Decode Base64
  const bytes = atob(str);

  // Create a Uint8Array to hold the bytes
  const byteArray = new Uint8Array(bytes.length);

  // Populate the array with the byte values
  for (let i = 0; i < bytes.length; i++) {
    byteArray[i] = bytes.charCodeAt(i);
  }

  // Convert the byte array to a string with UTF-8 encoding
  const decodedString = new TextDecoder('utf-8').decode(byteArray);

  return decodedString;
}

export const cachedFetch = async (
  {
    id: rawId,
    path,
    rootContext,
    filterDataPaths,
    filterFields,
    options,
  }: {
    id: string,
    path: string;
    rootContext?: string;
    filterDataPaths?: string[];
    filterFields?: Record<string, string[]>;
    options?: {
      credentials?: 'omit' | 'include';
      returnError?: boolean;
    };
  },
  get: GetRecoilValue,
) => {
  const id = hash(rawId);
  const persistentCache = get(cacheAtom);
  const apiEndpoint = get(apiEndpointAtom);
  const u = new URL(path, apiEndpoint);
  const urlStr = u.toString();

  // When we want to use variable that only exists per single
  // navigation we use requestVarsAtom
  const { getRequestVar, setRequestVar } = get(requestVarsAtom);
  const { getSyncData, setSyncData } = get(syncDataAtom);

  
  const serverSyncedData = getSyncData(id);
  if (serverSyncedData) {
    
    if (typeof Buffer !== 'undefined') {
      return JSON.parse(Buffer.from(serverSyncedData, 'base64').toString('utf8'));
    }
    return JSON.parse(base64Decode(serverSyncedData));

  }

  const requestPromiseMap = getRequestVar('requestPromiseMap', new Map()) as Map<string, Promise<any>>;

  if (requestPromiseMap.has(id)) {
    return requestPromiseMap.get(id);
  }

  /**
   * Actual data fetching
   * @returns data
   */
  const fetchData = async () => {
    let data = await jsonFetch(urlStr, { credentials: options?.credentials });
    if (rootContext) {
      data = lodashGet(data, rootContext);
    }
    if (filterDataPaths?.length) {
      data = filterData(data, filterDataPaths);
    }

    /**
     * @todo create util function
     */
    if (filterFields) {
      const dataFieldKeys = Object.keys(filterFields);
      for (let i = 0; i < dataFieldKeys.length; i += 1) {
        const keyPath = dataFieldKeys[i];
        const previousData = lodashGet(data, keyPath);
        if (typeof previousData !== 'undefined') {
          try {
            const fields = filterFields[keyPath];
            const newData = Array.isArray(previousData)
              ? previousData.map((p) => lodashPick(p, fields))
              : lodashPick(previousData, fields);
            lodashSet(data, keyPath, newData);
          } catch (ex) {
            console.log(ex);
          }
        }
      }
    }
    return data;
  };

  /**
   * Background fetching should only happen once in x number of servers
   * thus using request vars won't work
   */
  // const bgDataFetch = async () => {
  //   try {
  //     if (await persistentCache.has(`${id}__lock`)) {
  //       return;
  //     }
  //     await persistentCache.set(`${id}__lock`, true, { ttl: 60000 });
  //     // Fetch data save that data in cache
  //     const data = await fetchData();
  //     await persistentCache.set(id, data);
  //     await persistentCache.del(`${id}__lock`);
  //   } catch {
  //     // if an error occurs in execution of fetchData, we should remove the lock
  //     await persistentCache.del(`${id}__lock`);
  //   }
  // };

  // const fetchFromCache = async () => {
  //   if (await persistentCache.has(id)) {
      
  //     const data = await persistentCache.get(id);
  //     // Fetch in background
  //     bgDataFetch();
  //     return data;
  //   }
  //   return null;
  // };

  const withSyncData = (data: any) => {
    if (data && typeof window === 'undefined') {
      setSyncData(id, Buffer.from(JSON.stringify(data), 'utf8').toString('base64'));
    }
    return data;
  };

  const process = async () => {
    
    // const cachedData = await fetchFromCache();

    // if (cachedData) {
      
    //   return withSyncData(cachedData);
    // }

    if (options?.returnError) {
      
      try {
        
        const data = await fetchData();
        return withSyncData(data);
      } catch (e: unknown) {
        if (e instanceof FetchError) {
          return e.jsonResponse;
        }
        return {};
      }
    }
    
    const data = await fetchData();
    return withSyncData(data);
  };

  const promise = process();
  requestPromiseMap.set(id, promise);
  setRequestVar('requestPromiseMap', requestPromiseMap);

  const data = await promise;
  return data;
};
