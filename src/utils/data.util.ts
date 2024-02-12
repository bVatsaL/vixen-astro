import { pick, get, set } from 'lodash-es';
// import _ from 'lodash';

export const filterData = (data: Record<any, any> | any[], validFields: string[]) => {
  if (Array.isArray(data)) {
    return data.map((d) => pick(d, validFields));
  }
  const filteredData: Record<string, any> = {};
  for (let i = 0; i < validFields.length; i += 1) {
    const path = validFields[i];
    set(filteredData, path, get(data, path));
  }
  return filteredData;
};
