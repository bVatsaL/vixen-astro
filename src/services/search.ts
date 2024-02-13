import { $searchDomainName, $siteId } from '@atoms/site-config';
import { computed } from 'nanostores';
import { apiFetch } from './api-fetch';
import { $defaultCarModels, $preOwnedTotal } from '@atoms/search';

export const esSearchEndpoint =
  'https://search.foxdealer.com/api/vehicle/search';

export const $inventoryCount = (searchStr: string) =>
  computed([$searchDomainName, $siteId], async (domain, siteId) => {
    const searchUrl = new URL(esSearchEndpoint);
    const searchParams = new URLSearchParams(searchStr);
    searchUrl.searchParams.set('domain', domain);
    searchUrl.searchParams.set('offset', '0');
    searchUrl.searchParams.set('per_page', '0');
    searchUrl.searchParams.set('blog_id', siteId);
    searchParams.forEach((data, key) => {
      searchUrl.searchParams.set(`filters[${key}]`, data);
    });
    const newSearchResult = await apiFetch({
      path: searchUrl.toString(),
      filterDataPaths: ['data.total'],
      options: {
        credentials: 'omit',
        returnError: true,
      },
    });
    return newSearchResult?.data?.total > 1
      ? newSearchResult?.data?.total
      : null;
  });

export const fetchDefaultCarModels = async () => {
  const searchUrl = new URL(esSearchEndpoint);
  const domain = $searchDomainName.get();
  searchUrl.searchParams.set('domain', domain);
  searchUrl.searchParams.set('offset', '0');
  searchUrl.searchParams.set('filters[type]', 'new');
  const newSearchResults = await apiFetch({
    path: searchUrl.toString(),
    filterDataPaths: ['aggregations.model.list'],
    options: {
      credentials: 'omit',
      returnError: true,
    },
  });
  const models = newSearchResults?.aggregations?.model?.list ?? [];
  $defaultCarModels.set(
    models.map((m: { display_name: string; item: string }) => ({
      display_name: m.display_name,
      item: m.item,
    }))
  );
};

export const fetchPreOwnedTotal = async () => {
  const searchUrl = new URL(esSearchEndpoint);
  const domain = $searchDomainName.get();
  searchUrl.searchParams.set('domain', domain);
  searchUrl.searchParams.set('per_page', '0');
  searchUrl.searchParams.set('filters[type]', 'used');
  searchUrl.searchParams.set('offset', '0');
  const result = await apiFetch({
    path: searchUrl.toString(),
    filterDataPaths: ['data.total'],
    options: {
      credentials: 'omit',
      returnError: true,
    },
  });
  $preOwnedTotal.set(result?.data?.total || '');
};
