export type BannerItem = {
  title?: string;
  isDefaultBanner?: boolean;
  additionalSettings?: {
    vixen_only?: boolean[];
    is_hp_background_img_enabled?: boolean[];
  };
  schedule?: {
    pages?: {
      homepage?: {
        show?: boolean;
        homepagespecial?: boolean;
        noDesktopBannerOnMobile?: boolean;
        images?: {
          desktop?: {
            id?: number;
            url?: string;
            alt?: string;
          };
          mobile?: {
            id?: number;
            url?: string;
          };
        };
        video?: {
          url?: string;
        };
        url?: string;
        target?: string;
      };
      srp?: {
        show?: boolean;
        images?: {
          desktop?: {
            id?: number;
            url?: string;
          };
          mobile?: {
            id?: number;
            url?: string;
          };
        };
        query_fields?: {
          make?: string[];
          model?: string[];
          year?: string[];
          show?: boolean;
          target?: string;
          url?: string;
        };
        url?: string;
        target?: string;
        urlApplyTo?: string[];
      };
    };
    disclaimer?: string;
  };
};
