import jsonFetch from '@utils/json-api.util';
import { $apiEndpoint } from '../stores/site-config';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashPick from 'lodash/pick';
import { filterData } from '@utils/data.util';

export const apiFetch = async ({
  path,
  rootContext,
  filterDataPaths,
  filterFields,
  options,
}: {
  path: string;
  rootContext?: string;
  filterDataPaths?: string[];
  filterFields?: Record<string, string[]>;
  options?: {
    credentials?: 'omit' | 'include';
    returnError?: boolean;
  };
}) => {
  const apiEndpoint = $apiEndpoint.get();
  const u = new URL(path, apiEndpoint);
  const urlStr = u.toString();

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
