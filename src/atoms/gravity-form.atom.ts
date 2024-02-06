import { selectorFamily } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { expectedSiteOriginAtom, siteUrlAtom } from './site.atom';

export const gravityFormAtom = selectorFamily({
  key: 'gravityForm',
  get:  (formId: string) => async ({ get }) => {
    const siteUrl = get(siteUrlAtom);
    const siteOrigin = get(expectedSiteOriginAtom);
    const gravityFormUrl = new URL(`/_api/gf/get/${formId}`, siteUrl);
    gravityFormUrl.searchParams.append('origin', siteOrigin);
    const data = await cachedFetch({
      id: `gravityForm${formId}`,
      path: gravityFormUrl?.toString(),
    }, get);
    return data;
  },
});
