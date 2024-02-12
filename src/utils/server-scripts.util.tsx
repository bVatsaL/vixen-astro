import type { Scripts, ThirdPartyScript } from '@typedefs/scripts';
import htmlParse from 'html-react-parser';
import { cloneElement, type ReactElement } from 'react';
import { v4 } from 'uuid';
import { getCache } from 'vixen-cache';
import jsonFetch from './json-api.util';

export const extractAsReactElements = (script: string, keyPrefix?: string) => {
  const arr: ReactElement[] = [];
  let prefix = keyPrefix ?? v4();
  const pushIndex = 0;
  let parsed = htmlParse(script);
  if (Array.isArray(parsed)) {
    parsed = parsed
      .filter(Boolean)
      // @ts-ignore
      .filter((e) => e !== '\n');

    parsed.forEach((p) => {
      prefix += 1;
      arr.push(
        cloneElement(p, {
          key: `${prefix}_${pushIndex}`,
        }),
      );
    });
  } else if (typeof parsed === 'string') {
    // do nothing.
  } else {
    prefix += 1;
    arr.push(
      cloneElement(parsed, {
        key: `${prefix}_${pushIndex}`,
      }),
    );
  }
  return arr;
};

const getThirdPartyScripts = async (apiEndpoint: string) => {
  if (!apiEndpoint) {
    return {};
  }
  const cache = await getCache();
  const url = new URL('third_party_scripts', apiEndpoint);
  const urlStr = url.toString();
  const bgFetch = async () => {
    const scripts = await jsonFetch(url.toString());
    await cache.set(urlStr, scripts);
    return scripts;
  };
  if (await cache.has(urlStr)) {
    bgFetch();
    return cache.get(urlStr);
  }
  return bgFetch();
};

const scriptsCache = new Map<string, Scripts>();

export const getScripts = async (apiEndpoint: string, options = { useCache: true }): Promise<Scripts> => {
  if (options.useCache && scriptsCache.has(apiEndpoint)) {
    getScripts(apiEndpoint, { useCache: false });
    const returnData = scriptsCache.get(apiEndpoint);
    if (returnData) {
      return returnData;
    }
  }

  const headerScripts: ThirdPartyScript[] = [];
  const footerScripts: ThirdPartyScript[] = [];
  const scripts = await getThirdPartyScripts(apiEndpoint);

  ((scripts?.scripts ?? []) || []).forEach((scriptItem: any) => {
    ((scriptItem?.data ?? []) || []).forEach((d: any) => {
      if (d?.third_party_script__is_active === 'active') {
        try {
          if (d?.third_party_script__placement === 'head') {
            headerScripts.push({
              page: d?.third_party_script__page ?? 'all',
              elements: d?.third_party_script__code,
            });
          }
          if (d?.third_party_script__placement === 'footer') {
            footerScripts.push({
              page: d?.third_party_script__page ?? 'all',
              elements: d?.third_party_script__code,
            });
          }

          // <noscript> code goes in the body
          if (d?.third_party_noscript__code) {
            footerScripts.push({
              page: d?.third_party_script__page ?? 'all',
              elements: d?.third_party_noscript__code,
            });
          }

          // meta code goes in the head
          if (d?.third_party_meta_tag__code) {
            headerScripts.push({
              page: d?.third_party_script__page ?? 'all',
              elements: d?.third_party_meta_tag__code,
            });
          }
        } catch (ex) {
          console.error(ex);
        }
      }
    });
  });
  const returnData = { headerScripts, footerScripts };
  scriptsCache.set(apiEndpoint, returnData);
  return returnData;
};
