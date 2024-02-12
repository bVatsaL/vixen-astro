import { getLocale } from './language.util';

/**
 * Parse url like below to get appropriate search params for inventory
 * parseInventoryUrl('/inventory/used');
 * parseInventoryUrl('/inventory/new');
 * parseInventoryUrl('/inventory/new-specials');
 * parseInventoryUrl('/inventory/used-specials');
 * parseInventoryUrl('/inventory/new-chevrolet-silverado_1500/');
 * @param path string
 * @returns URLSearchParams
 */
export const parseInventoryUrlParams = (path: string): URLSearchParams => {
  const url = new URL(path, 'https://www.foxdealer.com');
  const { pathname, searchParams } = url;
  const newSearchParams = new URLSearchParams(searchParams);

  const pathnameArr = pathname.toLowerCase().split('/').filter(Boolean);

  const locale = getLocale(pathname);
  if (pathnameArr?.[0] === locale) {
    pathnameArr.splice(0, 1);
  }

  if (pathnameArr?.[0] !== 'inventory') {
    return new URLSearchParams();
  }
  // If not need to break the url and slug
  if (!pathnameArr?.[1]) {
    newSearchParams.sort();
    return newSearchParams;
  }

  const slug = pathnameArr?.[1] ?? '';
  const slugParts = (slug.replaceAll('--', '^') ?? '').split('-');
  const specialsIndex = slugParts.indexOf('specials');
  if (specialsIndex !== -1) {
    newSearchParams.set('isspecial', '1');
    slugParts.splice(specialsIndex, 1);
  }
  let type;
  let year;
  let make;
  let model;
  let trim;
  for (let current = 0; current < slugParts.length; current += 1) {
    if (current === 0) {
      type = slugParts[current].replace(/_/gi, ' ').replace('^', '-');
    }
    if (current === 1) {
      year = slugParts[current].replace(/_/gi, ' ').replace('^', '-');
    }
    if (current === 2) {
      make = slugParts[current].replace(/_/gi, ' ').replace('^', '-');
    }
    if (current === 3) {
      model = slugParts[current].replace(/_/gi, ' ').replace('^', '-');
    }
    if (current === 4) {
      trim = slugParts[current].replace(/_/gi, ' ').replace('^', '-');
    }
  }
  if (year && parseInt(year, 10).toString() !== year) {
    trim = model;
    model = make;
    make = year;
    year = undefined;
  }
  if (type) {
    newSearchParams.append('type', type);
  }
  if (year) {
    newSearchParams.append('year', year);
  }
  if (make) {
    newSearchParams.append('make', make);
  }
  if (model) {
    newSearchParams.append('model', model);
  }
  if (trim) {
    newSearchParams.append('trim', trim);
  }
  newSearchParams.sort();
  return newSearchParams;
};

export const getInventoryUrl = (searchParams: URLSearchParams | string) => {
  const dummyBase = 'https://www.foxdealer.com';
  const params = searchParams instanceof URLSearchParams ? searchParams : new URLSearchParams(searchParams);
  const inventoryUrl = new URL('/inventory/', dummyBase);
  inventoryUrl.search = params.toString();
  const finalInventoryUrl = inventoryUrl.toString().replace(dummyBase, '');
  return finalInventoryUrl;
};

export const getVDPUrl = (vehicleDetails: any, addStock = false) => {
  const year = (vehicleDetails?.carYear ?? vehicleDetails?.year ?? vehicleDetails?.productInfo?.year ?? '').toString();
  const type = (vehicleDetails?.carType ?? vehicleDetails?.type ?? vehicleDetails?.productInfo?.type ?? '').toString();
  const make = (vehicleDetails?.carMake ?? vehicleDetails?.make ?? vehicleDetails?.productInfo?.make ?? '').toString();
  const model = (
    vehicleDetails?.carModel ??
    vehicleDetails?.model ??
    vehicleDetails?.productInfo?.model ??
    ''
  ).toString();
  const trim = (vehicleDetails?.carTrim ?? vehicleDetails?.trim ?? vehicleDetails?.productInfo?.trim ?? '').toString();
  const stock = (vehicleDetails?.stock ?? vehicleDetails?.stock ?? vehicleDetails?.productInfo?.stock ?? '').toString();
  const vin = (vehicleDetails?.vin ?? vehicleDetails?.productInfo?.vin ?? '').toString();

  const paramsArr: string[] = [type, year, make, model, trim, ...(addStock ? [stock] : [])]
    .filter(Boolean)
    .map((a) => a.toLowerCase().replace(/[\s/]/gi, '_'));

  paramsArr.push(vin);
  const urlSlug = paramsArr.join('-');
  return `/inventory/${urlSlug}`;
};
