import { selectorFamily } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { esSearchEndpoint } from './search.atom';
import { searchDomainAtom } from './site.atom';

export const searchFormOptionsAtom = selectorFamily({
  key: 'searchFormOptions',
  get:
    (options: { model: string; standardbody: string; msrp: string; make?: string; type?: string; year?: string }) =>
    async ({ get }) => {
      const searchUrl = new URL(esSearchEndpoint);
      const domain = get(searchDomainAtom);
      searchUrl.searchParams.set('domain', domain);
      searchUrl.searchParams.set('per_page', '0');
      searchUrl.searchParams.set('offset', '0');
      if (options.model) {
        searchUrl.searchParams.set('filters[model]', options.model);
      }
      if (options.standardbody) {
        searchUrl.searchParams.set('filters[standardbody]', options.standardbody);
      }
      if (options.msrp) {
        searchUrl.searchParams.set('filters[msrp]', options.msrp);
      }
      if (options.make) {
        searchUrl.searchParams.set('filters[make]', options.make);
      }
      if (options.type) {
        searchUrl.searchParams.set('filters[type]', options.type);
      }
      if (options.year) {
        searchUrl.searchParams.set('filters[year]', options.year);
      }
      const result = await cachedFetch(
        {
          id: `searchFormOptions-${searchUrl.searchParams.toString()}`,
          path: searchUrl.toString(),
          filterDataPaths: ['aggregations'],
          options: {
            credentials: 'omit',
            returnError: true,
          },
        },
        get,
      );
      const model = result?.aggregations?.model?.list ?? [];
      const standardbody = result?.aggregations?.standardbody?.list ?? [];
      const msrp = result?.aggregations?.msrp?.list ?? [];
      const make = result?.aggregations?.make?.list ?? [];
      const type = result?.aggregations?.type?.list ?? [];
      const year = result?.aggregations?.year?.list ?? [];
      return {
        model: model.map(
          (m: {
            display_name: string;
            item: string;
            count: string | number;
          }) => ({
            display_name: `${m.display_name} (${m.count})`,
            item: m.item,
          }),
        ),
        standardbody: standardbody.map(
          (m: {
            display_name: string;
            item: string;
            count: string | number;
          }) => ({
            display_name: `${m.display_name} (${m.count})`,
            item: m.item,
          }),
        ),
        msrp: msrp.map(
          (m: {
            display_name: string;
            item: string;
            count: string | number;
          }) => ({
            display_name: `${m.display_name} (${m.count})`,
            item: m.item,
          }),
        ),
        make: make.map(
          (m: {
            display_name: string;
            item: string;
            count: string | number;
          }) => ({
            display_name: `${m.display_name} (${m.count})`,
            item: m.item,
          }),
        ),
        type: type.map(
          (m: {
            display_name: string;
            item: string;
            count: string | number;
          }) => ({
            display_name: `${m.display_name} (${m.count})`,
            item: m.item,
          }),
        ),
        year: year.map(
          (m: {
            display_name: string;
            item: string;
            count: string | number;
          }) => ({
            display_name: `${m.display_name} (${m.count})`,
            item: m.item,
          }),
        ),
      };
    },
});
