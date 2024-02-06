import {
  AggregationRecord,
  AggregationRecordWithSelected,
  Aggregations,
  FdiCustomUrl,
  SearchResponse,
  SearchResultItem,
  VehicleResponse,
} from '@typedefs/search';
import { VehicleComputedFields } from '@typedefs/vehicle';
import cloneDeep from 'lodash/cloneDeep';
import { getValidAggreagtionKeysbySiteName } from './aggregation.util';

const defaultSeparator = ',';
const separatorMap: Record<string, string> = {
  miles: '|',
  display_price: '|',
  epacity: '|',
  epahighway: '|',
  dealer_offer: '|',
};

// const validAggregationKeys = [
//   'drivetrain',
//   'miles',
//   'dealername',
//   'type',
//   'display_price',
//   'make',
//   'model',
//   'extcolorgeneric',
//   'int_colorgeneric',
//   'body',
//   'year',
//   'trim',
//   'engdescription',
//   'fueltype',
//   'epacity',
//   'epahighway',
//   'priority_option',
// ];
export type ReplaceMentMap = Record<
  string,
  {
    printable_name?: { to: string };
    display_name?: {
      from: string;
      to: string;
    };
  }
>;

const defaultReplacementMap: ReplaceMentMap = {
  Mileage: {
    printable_name: {
      to: 'Kilometers',
    },
    display_name: {
      from: 'Miles',
      to: 'KM',
    },
  },
  'City MPG': {
    printable_name: {
      to: 'City L/100KM',
    },
    display_name: {
      from: 'MPG',
      to: 'L/100KM',
    },
  },
  'Highway MPG': {
    printable_name: {
      to: 'Highway L/100KM',
    },
    display_name: {
      from: 'MPG',
      to: 'L/100KM',
    },
  },
  Color: {
    printable_name: {
      to: 'Exterior Color',
    },
  },
  Condition: {
    display_name: {
      from: 'Used',
      to: 'Pre-Owned',
    },
  },
};

export const withReplacements = (
  data: AggregationRecord,
  replacementMap: ReplaceMentMap = defaultReplacementMap,
): AggregationRecord => {
  const clonedData = { ...data };
  if (replacementMap?.[clonedData?.printable_name]) {
    // Replace in all list the display name as requested
    if (replacementMap[clonedData?.printable_name]?.display_name) {
      const from = replacementMap[clonedData?.printable_name]?.display_name?.from;
      const to = replacementMap[clonedData?.printable_name]?.display_name?.to;
      if (from && to) {
        clonedData.list = clonedData.list.map((listItem) => ({
          ...listItem,
          display_name: listItem.display_name.replace(new RegExp(from, 'ig'), to),
        }));
      }
    }
    // Replace printable name if exists
    clonedData.printable_name =
      replacementMap[clonedData.printable_name]?.printable_name?.to ?? clonedData.printable_name;
  }
  return clonedData;
};

export const getFieldSeparator = (field: string) => separatorMap?.[field] ?? defaultSeparator;

export const sanitizeAggregations = (
  aggregations: Aggregations,
  options: { replace?: boolean; siteName?: string; isTypeNew?: boolean } = { replace: true, isTypeNew: false },
  replacementMap?: ReplaceMentMap,
): Aggregations => {
  const validAggregationKeys = getValidAggreagtionKeysbySiteName(options?.isTypeNew ? `${options?.siteName}_New` : options?.siteName);
  const selectedSortedAggregations: Aggregations = {};
  for (let i = 0; i < validAggregationKeys.length; i += 1) {
    const key = validAggregationKeys[i];
    if (aggregations?.[key] && Object.keys(aggregations[key]).length) {
      let clonedData = cloneDeep(aggregations[key]);
      if (options.replace) {
        clonedData = withReplacements(clonedData, replacementMap);
      }
      selectedSortedAggregations[key] = clonedData;
    }
  }
  return selectedSortedAggregations;
};

export const withSelected = (
  aggregationRecords: AggregationRecord[],
  searchParams: URLSearchParams,
): AggregationRecordWithSelected[] => {
  const aggregationsWithSelected: AggregationRecordWithSelected[] = [];
  for (let i = 0; i < aggregationRecords.length; i += 1) {
    const record = { ...aggregationRecords[i], selected: false };
    const value = searchParams.get(aggregationRecords[i].field_name);
    const valueArr = (value ?? '').split(getFieldSeparator(record.field_name)).map((t) => t.toLowerCase());
    const list = aggregationRecords[i].list.map((listItem) => ({
      ...listItem,
      selected: valueArr.includes(listItem.item.toLowerCase()),
    }));
    record.selected = searchParams.has(aggregationRecords[i].field_name);
    record.list = list;

    aggregationsWithSelected.push(record as AggregationRecordWithSelected);
  }
  return aggregationsWithSelected;
};

export const addNewFileds = (hits: SearchResultItem[]) =>
  hits.map((h) => ({
    ...h,
    carTitle:
      h.condition === 'Certified'
        ? `${h.condition} ${h.type} ${h.year} ${h.make} ${h.model} ${h.drivetrain}`
        : `${h.type} ${h.year} ${h.make} ${h.model} ${h.drivetrain}`,
    carDescription:
      h.standardbody === h.body
        ? ` ${h.trim} ${h.standardbody} ${h.transdescription} `
        : ` ${h.trim} ${h.standardbody}  ${h.body} ${h.transdescription} `,

    isCertified: h.certified === '1' || h?.condition === 'Certified',
    isOnOrder: h.comment5 === 'on_order',
  }));

export const addCustomFields = (srpResults: SearchResponse) => ({
  ...srpResults,
  data: {
    ...srpResults?.data,
    hits: addNewFileds(srpResults?.data?.hits ?? []),
  },
});

export const addNewFieldToVDP = (data: VehicleResponse): VehicleResponse & VehicleComputedFields => ({
  ...data,
  carTitle:
    data.condition === 'Certified'
      ? `${data.condition} ${data.type} ${data.year} ${data.make} ${data.model} ${data.drivetrain}`
      : `${data.type} ${data.year} ${data.make}  ${data.model} ${data.drivetrain}`,
  carDescription:
    data.standardbody === data.body
      ? ` ${data.trim} ${data.standardbody} ${data.drivetrain} 
  ${data.transdescription} `
      : ` ${data.trim} ${data.standardbody} ${data.body}
  ${data.drivetrain} ${data.transdescription} `,
  price: Number(data.msrp).toLocaleString(),
  isCertified: data.certified === '1' || data.condition === 'Certified',
  isOnOrder: data.comment5 === 'on_order',
  interiorData:
    data?.standardequipment
      ?.filter?.((i: any) => i.category === 'Interior' || i.category === 'INTERIOR')
      .map((d: any) => d?.description ?? '') || [],
  safetyData:
    data?.standardequipment
      ?.filter?.((i: any) => i.category === 'Safety' || i?.category === 'SAFETY')
      .map((d: any) => d?.description ?? '') || [],
  mechanicalData:
    data?.standardequipment
      ?.filter?.((i: any) => i.category === 'Mechanical' || i?.category === 'MECHANICAL')
      .map((d: any) => d?.description ?? '') || [],
  exteriorData:
    data?.standardequipment
      ?.filter?.((i: any) => i.category === 'Exterior' || i?.category === 'EXTERIOR')
      .map((d: any) => d?.description ?? '') || [],
});

const customSearchFilterKeyMap: Record<string, string> = {
  makes: 'make',
  models: 'model',
  types: 'type',
  years: 'year',
  conditions: 'condition',
  standardbodies: 'standardbody'
}

export const getCustomUrlSearchParams = (customUrlData: FdiCustomUrl) => {
  let customUrlSearchStr = '';
  if (customUrlData?.path) {
    Object.entries(customUrlData)?.forEach((i) => {
      if (i?.[0] !== 'path' && !!i?.[1]?.length) {
        const filterKey = customSearchFilterKeyMap?.[i?.[0]] ?? i?.[0];
        customUrlSearchStr = `${customUrlSearchStr}&${filterKey}=${i?.[1]?.toString()}`;
      }
    });
  }
  const finalCustomSearchStr = customUrlSearchStr?.substring(1, customUrlSearchStr?.length)?.toLowerCase?.();
  const customUrlSearchParams = new URLSearchParams(finalCustomSearchStr);
  return customUrlSearchParams;
}
