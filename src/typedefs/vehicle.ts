export type VehicleDetail = {
  'image-src'?: string;
  'inventory-url'?: string;
  inventory_count?: number;
  noStockLabel?: string;
  lowest_price?: string;
  title?: string;
  isPicture?: boolean;
  'research-url'?: string;
  subtitle?: string;
  bgColor?: string;
};

export type Vehicle = {
  bg_img?: {
    media_library?: {
      src?: string;
    };
  };
  category?: string;
  categoryLink?: string;
  details?: VehicleDetail[];
  catLogo?: {
    url?: string;
    image?: string;
    title?: string;
  };
};

export type VehicleComputedFields = {
  carTitle: string;
  carDescription: string;
  price: string;
  isCertified: boolean;
  isOnOrder: boolean;
  interiorData: string[];
  safetyData: string[];
  mechanicalData: string[];
  exteriorData: string[];
};
