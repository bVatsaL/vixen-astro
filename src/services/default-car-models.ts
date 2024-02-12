import { $searchDomainName } from '@atoms/site-config';
import { apiFetch } from './api-fetch';
import { $defaultCarModels } from '@atoms/search';

export const esSearchEndpoint = 'https://search.foxdealer.com/api/vehicle/search';

export const fetchDefaultCarModels = async () => {
  const searchUrl = new URL(esSearchEndpoint);
  const domain = $searchDomainName.get();
  searchUrl.searchParams.set('domain', domain);
  searchUrl.searchParams.set('offset', '0');
  searchUrl.searchParams.set('filters[type]', 'new');
  const newSearchResults = await apiFetch(
    {
      path: searchUrl.toString(),
      filterDataPaths: ['aggregations.model.list'],
      options: {
        credentials: 'omit',
        returnError: true,
      },
    },
  );
  const models = newSearchResults?.aggregations?.model?.list ?? [];
  $defaultCarModels.set(models.map((m: { display_name: string; item: string }) => ({
    display_name: m.display_name,
    item: m.item,
  })));
};
