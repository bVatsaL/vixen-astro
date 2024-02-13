import { $global } from '@atoms/global';
import { $apiEndpoint } from '@atoms/site-config';
import jsonFetch from '@utils/json-api.util';

export const fetchGlobalData = async () => {
  const apiEndpoint = $apiEndpoint.get();
  const globalSiteDataUrl = new URL(apiEndpoint);
  globalSiteDataUrl.searchParams.append('api', import.meta.env.TEMPLATE_TAGS_API_KEY ?? '');
  globalSiteDataUrl.searchParams.append('raw_json', 'true');
  globalSiteDataUrl.searchParams.append('show_template_tags', 'true');

  let global = await jsonFetch(globalSiteDataUrl.toString(), { credentials: 'omit' });
  $global.set(global ?? []);
};
