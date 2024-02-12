import { PriorityOptions } from '@components/key-features';

export type SearchResultItem = {
  dealername: string;
  stock?: number;
  vin?: string;
  type?: string;
  year?: number;
  make?: string;
  model?: string;
  drivetrain?: string;
  trim?: string;
  standardbody?: string;
  body?: string;
  marketclass?: string;
  transdescription?: string;
  miles?: string;
  msrp?: number;
  display_price?: string;
  condition?: string;
  dealer_discount?: number;
  comment3?: string;
  comment5?: string;
  feed_id?: string;
  carTitle?: string;
  cab?: string;
  bed?: string;
  carDescription?: string;
  price?: string;
  isCertified?: boolean;
  isOnOrder?: boolean;
  imagelist?: SearchImageList[];
  conditional_price?: number;
  dealer_offer: string[];
  isspecial: string;
  available_incentives: Record<string, any>;
  isImage?: boolean;
  stockImageUrl?: string;
  engdescription?: string;
  extcolorgeneric?: string;
  fueltype?: string;
  specials?: {
    name: string;
    background_color?: string;
    text_color?: string;
  }[];
  vehiclesearchimg?: boolean;
  epacity?: number;
  epahighway?: number;
  carfaxoneowner?: number;
  carfaxhistoryreporturl?: string;
  certified?: string;
  priority_options?: PriorityOptions[];
  trans?: string;
  carfaxlogo?: string;
  video_url?: string;
  id?: number;
  sellingprice?: number;
  extcolor?: string;
  stockImageLink?: string;
  srpPromoOpenForm?: boolean;
  comment1?: string;
  in_transit?: number;
  reserve_flag?: number;
  intcolor?: string;
  friendlystyle?: string;
  extcolorhexcode?: string;
  intcolorhexcode?: string;
  comment20?: string;
  modelnumber?: string;
  miscprice1?: number;
  series_code?: string;
  permalink?: string;
  toyota?: any;
  total_savings?: number;
  status_disclaimer?: string;
  vehicle_status?: string;
  int_colorgeneric?: string;
};

export type SearchImageList = {
  url?: string;
};

export type AggregationListItem = {
  count: number;
  display_name: string;
  item: string;
};

export type AggregationRecord = {
  field_name: string;
  printable_name: string;
  list: AggregationListItem[];
};

export type AggregationRecordWithSelected = {
  field_name: string;
  printable_name: string;
  selected: boolean;
  list: (AggregationListItem & { selected: boolean })[];
  showMore?: boolean;
};
export type Aggregations = Record<string, AggregationRecord>;

export type SearchResponse = {
  aggregations: Aggregations;
  data: {
    hits: SearchResultItem[];
    total: number;
  };
  statusCode: number;
  status: string;
  current_query_fields: Record<string, string[]>;
};

export type HighLightsData = {
  imageUrl?: string;
  description?: string;
};

export type VehicleIncentive = {
  add_ons?: any[];
  affected_by_specials?: {
    id?: number;
    link?: string;
    title?: string;
  }[];
  apr?: number;
  biWeeklyPayment?: number;
  consumerCash?: any[];
  consumerCashConditional?: {
    description?: string;
    disclaimer?: string;
    expiry?: string;
    gmcc_id?: string;
    is_factory?: boolean;
    value?: number;
  }[];
  costOfBorrowing?: number;
  costPer1000?: number;
  description?: string;
  disable_cash_incentives?: boolean;
  disable_incentives?: boolean;
  disclaimer?: string;
  downPayment?: number;
  effectiveRate?: number;
  expiry?: string;
  fees?: any[];
  financedAmount?: number;
  financialInstitution?: string;
  length?: number;
  make_default?: boolean;
  monthlyPayment?: number;
  prevDisclaimer?: string;
  salesPrice?: number;
  salesPriceIncludingFees?: number;
  taxes?: any[];
  totalConsumerCash?: number;
  totalSavings?: number;
  type?: string;
  long_description?: string;
  weeklyPayment?: number;
  value?: string;
};

export type VehicleIncentiveGroup = {
  add_ons?: VehicleIncentive[];
  additional?: VehicleIncentive[];
  applied?: VehicleIncentive[];
  conditional?: VehicleIncentive[];
  long_description?: VehicleIncentive[];
};

export type VehicleResponse = {
  dealername: string;
  bed?: string;
  cab?: string;
  title?: string;
  stock?: number;
  certified?: string;
  vin?: string;
  type?: string;
  year?: number;
  make?: string;
  model?: string;
  drivetrain?: string;
  trim?: string;
  standardbody?: string;
  body?: string;
  dateinstock?: number;
  marketclass?: string;
  transdescription?: string;
  miles?: string | number;
  msrp?: number;
  miscprice1?: number;
  display_price?: string | number;
  condition?: string;
  dealer_discount?: number;
  comment5?: string;
  comment3?: string;
  feed_id?: string;
  carTitle?: string;
  carDescription?: string;
  price?: string;
  isCertified?: boolean;
  isOnOrder?: boolean;
  imagelist?: SearchImageList[];
  images?: SearchImageList[];
  interiorData?: string[];
  safetyData?: string[];
  mechanicalData?: string[];
  exteriorData?: string[];
  description?: string;
  description2?: string;
  engdescription?: string;
  extcolor?: string;
  intcolor?: string;
  options?: string[];
  epacity?: number;
  epahighway?: number;
  epacityev?: number;
  epahighwayev?: number;
  priority_options?: HighLightsData[];
  isspecial?: string;
  dealer_offer?: string[];
  extcolorgeneric?: string;
  standardequipment?: any[];
  fueltype?: string;
  trans?: string;
  total_incentives_value?: number | string;
  available_incentives: {
    cash?: VehicleIncentiveGroup;
    finance?: VehicleIncentiveGroup;
    lease?: VehicleIncentiveGroup;
  };
  installed_options?: InstalledOPtions[];
  specials?: {
    background_color: string;
    text_color: string;
    name?: string;
  }[];
  comment2?: string;
  comment4?: string;
  comment20?: string;
  carfaxhistoryreporturl?: string;
  carfaxoneowner?: number;
  total_savings?: number;
  conditional_price?: number;
  standardtrim?: string;
  id?: number;
  sellingprice?: number;
  video_url?: string;
  carfaxlogo?: string;
  comment1?: string;
  in_transit?: number;
  status_disclaimer?: string;
  vehicle_status?: string;
  permalink?: string;
  engblock?: string;
  friendlystyle?: string;
  extcolorhexcode?: string;
  intcolorhexcode?: string;
  int_colorgeneric?: string;
  modelnumber?: string;
  toyota?: any;
  series_code?: string;
  reserve_flag?: number;
  total_add_ons_value?: number;
};

export type SearchPriceItem = {
  display_price: number;
  msrp: number;
  sellingprice: number;
};

export type SrpStaticButton = {
  title: string;
  isModal: boolean;
  url?: string;
  modalId?: string;
  modalTitle?: string;
  isOnClick?: boolean;
  onClick?: any;
};

export type InstalledOPtions = {
  chromeCode?: string;
  description?: string;
  invoiceMax?: string;
  invoiceMin?: string;
  msrpMax?: string;
  msrpMin?: string;
  oemCode?: string;
};

export type CTADisclaimerResponse = {
  LWtoyo?: string;
  IPMtoyo?: string;
};

export type FdiCustomUrl = {
  path: string;
  types?: string[];
  models?: string[];
  makes?: string[];
  years?: string[];
  standardbodies?: string[];
  condtions?: string[];
};
