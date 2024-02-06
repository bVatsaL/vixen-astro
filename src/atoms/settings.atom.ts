import { selector, selectorFamily } from 'recoil-ssr';
import { cachedFetch } from './cache.atom';
import { siteConfigAtom, siteUniqueIdAtom, themeAtom, hasSiteAtom } from './site.atom';
import { defaultCarModelsAtom } from './search.atom';
import { uniqueId } from '@utils/constant';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export type TimeDataItem = {
  day?: string;
  time?: string;
};

export type TimeData = {
  title?: string;
  data?: TimeDataItem[];
};

const getTimeDataByLabel = (data: Record<string, string>, label: string) => ({
  title: data?.[`hours_title_${label}`],
  data: days.map((d) => {
    const hoursOpen = data[`hours_open_${d}_${label}`] ?? null;
    const hoursClose = data[`hours_close_${d}_${label}`] ?? null;
    return {
      day: d,
      time: hoursOpen ? `${hoursOpen} ${hoursClose ? `- ${hoursClose}` : ''}` : hoursClose,
    };
  }),
});

const getClosingTimeData = (data: Record<string, string>, label: string) => ({
  data: days.map((d) => {
    const hoursClose = data[`hours_close_${d}_${label}`] ?? null;
    return {
      time: hoursClose,
    };
  }),
});

export const settingsAtom = selector({
  key: 'settings',
  get: async ({ get }) => {
    const data = await cachedFetch(
      {
        id: 'settings',
        path: 'fdi_settings',
        // rootContext: 'fdi_settings',
        filterDataPaths: [
          'fdi_settings.[0].logo_primary.src',
          'fdi_settings.[0].cta_text_primary',
          'fdi_settings.[0].autotype_1',
          'fdi_settings.[0].autotype_2',
          'fdi_settings.[0].autotype_3',
          'fdi_settings.[0].forms__phone_required',
          'fdi_settings.[0].hide_inventory_count',
          'fdi_settings.[0].enable_gravity_form_api_vixen',
          'fdi_settings.[1]',
          'fdi_settings.[1].social_url_facebook',
          'fdi_settings.[1].social_url_twitter',
          'fdi_settings.[1].social_url_instagram',
          'fdi_settings.[1].social_url_youtube',
          'fdi_settings.[1].social_url_tiktok',
          'fdi_settings.[1].social_url_pintrest',
          'fdi_settings.[1].social_url_linkedin',
          'fdi_settings.[1].social_url_yelp',
          'fdi_settings.[3].frontpage_about_us_title',
          'fdi_settings.[3].frontpage_about_us_subtitle',
          'fdi_settings.[3].frontpage_about_us_copy',
          'fdi_settings.[3].frontpage_subhero_hide',
          'fdi_settings.[3].frontpage_subhero_desktop_only',
          'fdi_settings.[3].frontpage_about_us_section_img.src',
          'fdi_settings.[4].pricing_title_dealer_discount',
          'fdi_settings.[4].pricing_title_discounted_original_price_new',
          'fdi_settings.[4].pricing_title_discounted_original_price_used',
          'fdi_settings.[4].pricing_title_discounted_price_new',
          'fdi_settings.[4].pricing_title_discounted_price_used',
          'fdi_settings.[4].pricing_title_no_price',
          'fdi_settings.[4].pricing_title_original_price_new',
          'fdi_settings.[4].pricing_title_original_price_used',
          'fdi_settings.[4].pricing_title_selling_price',
          'fdi_settings.[4].pricing_field_final_price',
          'fdi_settings.[4].pricing_field_msrp',
          'fdi_settings.[4].pricing_title_dealer_discount',
          'fdi_settings.[4].pricing_title_total_savings',
          'fdi_settings.[4].triple_stack__title_text_cash',
          'fdi_settings.[4].triple_stack__title_text_finance',
          'fdi_settings.[4].triple_stack__final_price_text_finance',
          'fdi_settings.[4].triple_stack__final_price_text_lease',
          'fdi_settings.[4].triple_stack__title_text_lease',
          'fdi_settings.[4].triple_stack__title_content',
          'fdi_settings.[4].triple_stack__frequency_open_on_load',
          'fdi_settings.[4].triple_stack__payment_schedule',
          'fdi_settings.[4].triple_stack__term_length_lease',
          'fdi_settings.[4].triple_stack__term_length_finance',
          'fdi_settings.[4].price_stack__use_html',
          'fdi_settings.[4].vdp_show_total_addons',
          'fdi_settings.[4].vdp_show_total_incentives',
          'fdi_settings.[4].vdp_show_total_addons_text',
          'fdi_settings.[4].vdp_show_selling_price',
          'fdi_settings.[4].pricing_title_conditional_price',
          'fdi_settings.[4].carbox_show_stock_vin',
          'fdi_settings.[4].srp_lease_finance_boxes',
          'fdi_settings.[4].srp_filter_theme',
          'fdi_settings.[4].vdp__price_stack_theme',
          'fdi_settings.[4].cta_quickView__learnMore__text',
          'fdi_settings.[3].frontpage_quick_choose_background.src',
          'fdi_settings.[2].nav_banner_image.src',
          'fdi_settings.[2].nav_banner_url',
          'fdi_settings.[2].nav_banner_color_background',
          'fdi_settings.[2].nav_banner_color_font',
          'fdi_settings.[0].instantSearch_TopLink1_text',
          'fdi_settings.[0].instantSearch_TopLink1_link',
          'fdi_settings.[0].instantSearch_TopLink2_text',
          'fdi_settings.[0].instantSearch_TopLink2_link',
          'fdi_settings.[0].instantSearch_TopLink3_text',
          'fdi_settings.[0].instantSearch_TopLink3_link',
          'fdi_settings.[4].carbox_show_priority_options_icons',
          'fdi_settings.[0].primary_lead_form__title',
          'fdi_settings.[0].primary_lead_form__primary__cta',
          'fdi_settings.[4].show_conditional_cash_incentives',
          'fdi_settings.[4].disclaimer_canada',
          'fdi_settings.[0].logo_secondary.src',
          'fdi_settings.[4].vdp__price_stack_theme',
          'fdi_settings.[4].tagrail__id',
          'fdi_settings.[4].tagrail__pricing_tool_layout',
          'fdi_settings.[4].tagrail__btn_background',
          'fdi_settings.[4].tagrail__btn_cta_primary',
          'fdi_settings.[4].tagrail__btn_cta_secondary',
          'fdi_settings.[4].site__show_favorites',
          'fdi_settings.[4].disclaimer_default',
          'fdi_settings.[4].disclaimer_inventory_default_hide',
          'fdi_settings.[4].payment_calculator_starting_percentage',
          'fdi_settings.[4].disclaimer_gas_mileage',
          'fdi_settings.[4].carbox_inline_form',
          'fdi_settings.[4].vdp_form_primary_hide',
          'fdi_settings.[0].forms__email_required',
          'fdi_settings.[0].show_lead_form_textarea',
          'fdi_settings.[4].incentives_finance__term',
          'fdi_settings.[2].header_include_tertiary_phone',
          'fdi_settings.[2].header_include_secondary_phone',
          'fdi_settings.[4].carbox_specials_ribbon_default_text',
          'fdi_settings.[4].vehicle_title_arr',
          'fdi_settings.[4].vehicle_subtitle_arr',
          'fdi_settings.[4].triple_stack__disclaimer_theme',
          'fdi_settings.[4].show_lease_offer_fine_print',
          'fdi_settings.[4].show_finance_offer_fine_print',
          'fdi_settings.[4].calc_override_incentives',
          'fdi_settings.[0].site_units',
          'fdi_settings.[4].disclaimer_inventory_new',
          'fdi_settings.[4].disclaimer_inventory_used',
          'fdi_settings.[1].hours_title_primary',
          'fdi_settings.[1].hours_title_secondary',
          'fdi_settings.[1].hours_title_tertiary',
          'fdi_settings.[2].footer_include_secondary_phone',
          'fdi_settings.[2].footer_include_tertiary_phone',
          'fdi_settings.[4].vdp_hide_addons',
          'fdi_settings.[4].vdp_hide_incentives',
          'fdi_settings.[4].vdp_show_conditional_price',
          'fdi_settings.[6].land_rover_site_url',
          'fdi_settings.[6].jaguar_site_url',
          'fdi_settings.[4].carbox_show_text_specs',
          'fdi_settings.[4].vdp_hide_dealer_discount',
          'fdi_settings.[4].vdp_hide_total_savings',
          'fdi_settings.[4].vdp_description',
          'fdi_settings.[3].frontpage_heroSlider_show_desktop_only',
          'fdi_settings.[0].reviews_source__reviews_page',
          'fdi_settings.[4].carbox_overlay_type',
          'fdi_settings.[0].reviews__version',
          'fdi_settings.[6].reserve_flag_disclaimer',
          'fdi_settings.[6].reserve_flag_text',
          'fdi_settings.[6].reserve_flag_on',
          'fdi_settings.[4].pricing_msrp_disclaimer_show_settings',
          'fdi_settings.[4].pricing_msrp_disclaimer_settings',
          'fdi_settings.[4].srp_promo_item_position',
          'fdi_settings.[5].add_ga4_gtm_container',
          'fdi_settings.[0].instantSearch__is_active',
          'fdi_settings.[2].nav_banner_text',
          'fdi_settings.[4].in_transit_text',
          'fdi_settings.[6].carSaver__dealerId',
          'fdi_settings.[6].carSaver__campgaignId',
          'fdi_settings.[6].carSaver__btnColor',
          'fdi_settings.[6].carSaver__btnTextColor',
          'fdi_settings.[6].carSaver__btnText',
          'fdi_settings.[6].carSaver__v2',
          'fdi_settings.[6].smartpath_is_active',
          'fdi_settings.[6].smartpath_site_title',
          'fdi_settings.[6].smartpath_option_one',
          'fdi_settings.[6].smartpath_new_unlocked',
          'fdi_settings.[6].smartpath_enabled_vehicle_type',
          'fdi_settings.[6].smartpath_dealer_price_adjustment_title',
          'fdi_settings.[6].smartpath_show_lock_unlock_cta',
          'fdi_settings.[6].smartpath_lock_cta_title',
          'fdi_settings.[6].smartpath_unlock_cta_title',
          'fdi_settings.[6].smartpath_show_estimate_payment_cta',
          'fdi_settings.[6].smartpath_estimate_cta_title',
          'fdi_settings.[6].smartpath_show_value_your_trade_cta',
          'fdi_settings.[6].smartpath_value_your_trade_cta_title',
          'fdi_settings.[6].show_in_transit_disclaimer',
          'fdi_settings.[6].nissan_show_trim_in_title',
          'fdi_settings.[6].nissan_relocate_package_highlights_under_v_thumbs',
          'fdi_settings.[4].srp_banner_disclaimer',
          'fdi_settings.[2].footer_logo',
          'fdi_settings.[2].nav_banner_position',
          'fdi_settings.[3].frontpage_heroSlider_autoplaySpeed',
          'fdi_settings.[3].frontpage_heroSlider_speed',
          'fdi_settings.[3].frontpage_heroSlider_transitionType',
          'fdi_settings.[3].frontpage_heroSlider_autoplay',
          'fdi_settings.[4].pricing_msrp_strikethrough',
          'fdi_settings.[4].vehicle_image__used_omit_first_image',
          'fdi_settings.[7].show_video',
          'fdi_settings.[7].video_url',
          'fdi_settings.[7].autoplay',
          'fdi_settings.[7].text_form',
          'fdi_settings.[7].disc_date',
          'fdi_settings.[7].filter_type',
          'fdi_settings.[7].disc_text',
          'fdi_settings.[4].vdp_theme',
          'fdi_settings.[4].show_window_sticker',
          'fdi_settings.[0].search__restrict_by_type',
          'fdi_settings.[6].ddoa_is_active'
        ],
      },
      get,
    );
    return data.fdi_settings;
  },
});

export const siteLogoAtom = selector<string>({
  key: 'siteLogo',
  get: ({ get }) => {
    const themeName = get(themeAtom);
    const isSiteHavingNewHudsonLogo = get(hasSiteAtom(uniqueId.HUDSONAUTO));
    let siteLogo: string = get(siteConfigAtom)?.siteLogo ?? '';
    if (isSiteHavingNewHudsonLogo && themeName === 'usedcartheme1') {
      siteLogo =
        'https://cdn-pods.foxdealer.com/hudsonautogroup2/Hudson_Logo_2401_HORZ_2_C_LIGHT_1_357e6997bf_28d4f7a889.png';
    }
    return siteLogo;
  },
});

export const welcomeSectionAtom = selector<{
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}>({
  key: 'welcomeSection',
  get: ({ get }) => {
    const welcomeSectionData = get(settingsAtom)?.[3];
    return {
      title: welcomeSectionData?.frontpage_about_us_title || '',
      subtitle: welcomeSectionData?.frontpage_about_us_subtitle || '',
      description: welcomeSectionData?.frontpage_about_us_copy || '',
      imageUrl: welcomeSectionData?.frontpage_about_us_section_img?.src || '',
    };
  },
});

export const salesDataAtom = selector({
  key: 'salesData',
  get: ({ get }) => {
    const timeSectionData = get(settingsAtom)?.[1] || {};
    return getTimeDataByLabel(timeSectionData || {}, 'primary');
  },
});

export const salesClosingTimeAtom = selector({
  key: 'salesClosingTime',
  get: ({ get }) => {
    const timeSectionData = get(settingsAtom)?.[1] || {};
    const closingTime = getClosingTimeData(timeSectionData, 'primary');
    const day = (new Date().getDay() + 6) % 7; // setting Monday as 0,  Tuesday as 1 so on and Sunday as 6
    return closingTime?.data[day]
      ? `Our showroom is open today until ${closingTime.data[day].time.replace(/<.*?>/g, '')}`
      : '';
  },
});

export const servicesDataAtom = selector({
  key: 'servicesData',
  get: ({ get }) => {
    const timeSectionData = get(settingsAtom)?.[1] || {};
    return getTimeDataByLabel(timeSectionData || {}, 'secondary');
  },
});
export const partsDataAtom = selector({
  key: 'partsData',
  get: ({ get }) => {
    const timeSectionData = get(settingsAtom)?.[1] || {};
    return getTimeDataByLabel(timeSectionData || {}, 'tertiary');
  },
});
export const collisionDataAtom = selector({
  key: 'collisionData',
  get: ({ get }) => {
    const timeSectionData = get(settingsAtom)?.[1] || {};
    return getTimeDataByLabel(timeSectionData || {}, 'fourth');
  },
});

export const socialUrlsAtom = selector<{
  facbookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tikTokUrl?: string;
  pinterestUrl?: string;
  linkedinUrl?: string;
  yelpUrl?: string;
}>({
  key: 'socialMediaUrls',
  get: ({ get }) => {
    const socailMediaUrls = get(settingsAtom)?.[1];
    return {
      ...(socailMediaUrls?.social_url_facebook ? { facebookUrl: socailMediaUrls?.social_url_facebook || '' } : {}),
      ...(socailMediaUrls?.social_url_twitter ? { twitterUrl: socailMediaUrls?.social_url_twitter || '' } : {}),
      ...(socailMediaUrls?.social_url_instagram ? { instagramUrl: socailMediaUrls?.social_url_instagram || '' } : {}),
      ...(socailMediaUrls?.social_url_youtube ? { youtubeUrl: socailMediaUrls?.social_url_youtube || '' } : {}),
      ...(socailMediaUrls?.social_url_tiktok ? { tikTokUrl: socailMediaUrls?.social_url_tiktok || '' } : {}),
      ...(socailMediaUrls?.social_url_pintrest ? { pintrestUrl: socailMediaUrls?.social_url_pintrest || '' } : {}),
      ...(socailMediaUrls?.social_url_linkedin ? { linkedinUrl: socailMediaUrls?.social_url_linkedin || '' } : {}),
      ...(socailMediaUrls?.social_url_yelp ? { yelpUrl: socailMediaUrls?.social_url_yelp || '' } : {}),
    };
  },
});

export const socialInstagramUrlAtom = selector({
  key: 'socialInstagramUrl',
  get: ({ get }) => (get(settingsAtom)?.[1]?.social_url_instagram ?? '') || '',
});

export const pricingTitleOriginalPriceAtom = selectorFamily({
  key: 'pricingTitleOriginalPrice',
  get:
    ({ isDiscount, type }: { isDiscount?: boolean; type?: string }) =>
    ({ get }) => {
      let priceTitle = '';
      if (isDiscount && type === 'new') {
        priceTitle = get(settingsAtom)?.[4]?.pricing_title_discounted_original_price_new || '';
      } else if (isDiscount && type === 'used') {
        priceTitle = get(settingsAtom)?.[4]?.pricing_title_discounted_original_price_used || '';
      } else if (!isDiscount && type === 'new') {
        priceTitle = get(settingsAtom)?.[4]?.pricing_title_original_price_new || '';
      } else if (!isDiscount && type === 'used') {
        priceTitle = get(settingsAtom)?.[4]?.pricing_title_original_price_used || '';
      }
      return priceTitle || '';
    },
});

export const pricingTitleDiscountedPriceAtom = selectorFamily({
  key: 'pricingTitleDiscountedPrice',
  get: (type: string) => ({ get }) => {
    let priceTitle = '';
    if (type === 'new') {
      priceTitle = get(settingsAtom)?.[4]?.pricing_title_discounted_price_new || '';
    } else if (type === 'used') {
      priceTitle = get(settingsAtom)?.[4]?.pricing_title_discounted_price_used || '';
    }
    return priceTitle || '';
  },
});

export const srpPricingTitleDiscountedPriceAtom = selectorFamily({
  key: 'pricingTitleNoPrice',
  get: (type: string) => ({ get }) => {
    const discountedPriceTitle = get(pricingTitleDiscountedPriceAtom(type));
    const siteUniqueId = get(siteUniqueIdAtom);
    const discountedPriceTitleReplacementMap: Record<string, { from: string; to: string }> = {
      [uniqueId.WOLFECADILLACCALGARY]: {
        from: 'Wolfe Price',
        to: 'Price',
      },
    };
    const siteReplacementMap = discountedPriceTitleReplacementMap?.[siteUniqueId] ?? '';
    if (siteReplacementMap) {
      return discountedPriceTitle?.replace(siteReplacementMap?.from, siteReplacementMap?.to);
    } else {
      return discountedPriceTitle;
    }
  },
});

export const pricingTitleNoPriceAtom = selector({
  key: 'pricingTitleNoPrice',
  get: ({ get }) => get(settingsAtom)?.[4]?.pricing_title_no_price || '',
});

export const primaryLogoAtom = selector({
  key: 'primaryLogo',
  get: ({ get }) => get(settingsAtom)?.[0]?.logo_primary?.src || '',
});

export const pricingTitleDealerDiscountAtom = selector({
  key: 'pricingTitleDealerDiscount',
  get: ({ get }) => get(settingsAtom)?.[4]?.pricing_title_dealer_discount || '',
});

export const finalPriceFieldAtom = selector({
  key: 'finalPrice',
  get: ({ get }) => get(settingsAtom)?.[4]?.pricing_field_final_price || '',
});

export const highestPriceFieldAtom = selector({
  key: 'highestPrice',
  get: ({ get }) => get(settingsAtom)?.[4]?.pricing_field_msrp || '',
});

export const pricingTitleTotalSavingsAtom = selector({
  key: 'pricingTitleTotalSavings',
  get: ({ get }) => get(settingsAtom)?.[4]?.pricing_title_total_savings || '',
});

export const tripleStackCashTitleAtom = selector({
  key: 'tripleStackCashTitle',
  get: ({ get }) => get(settingsAtom)?.[4]?.triple_stack__title_text_cash || '',
});

export const tripleStackFinanceTitleAtom = selector({
  key: 'tripleStackFinanceTitle',
  get: ({ get }) => get(settingsAtom)?.[4]?.triple_stack__title_text_finance || '',
});

export const tripleStackLeaseTitleAtom = selector({
  key: 'tripleStackLeaseTitle',
  get: ({ get }) => get(settingsAtom)?.[4]?.triple_stack__title_text_lease || '',
});

export const ctaPrimaryTextAtom = selector({
  key: 'ctaPrimaryText',
  get: ({ get }) => get(settingsAtom)?.[0]?.cta_text_primary || 'Submit',
});

export const srpCardShowStockVinAtom = selector({
  key: 'srpCardShowStockVin',
  get: ({ get }) => get(settingsAtom)?.[4]?.carbox_show_stock_vin === 'true' || false,
});

export const srpFilterThemeAtom = selector({
  key: 'srpFilterTheme',
  get: ({ get }) => get(settingsAtom)?.[4]?.srp_filter_theme || 'default',
});

export const vdpPriceTagThemeAtom = selector({
  key: 'vdpPriceTabTheme',
  get: ({ get }) => get(settingsAtom)?.[4]?.vdp__price_stack_theme || '',
});

export const srpAutotypeAtom = selector<string[]>({
  key: 'srpAutoType',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const models = get(defaultCarModelsAtom);
    const newModelsList = models?.map((c: { display_name?: string; item?: string }) => c?.display_name);
    const { autotype_1: a1, autotype_2: a2, autotype_3: a3 } = get(settingsAtom)?.[0] ?? {};
    return siteUniqueId === uniqueId.TOYOTAOFLASVEGAS && ![a1, a2, a3]?.filter(Boolean)?.length
      ? newModelsList
      : [a1, a2, a3].filter(Boolean);
  },
});

export const formPhoneRequiredAtom = selector({
  key: 'formPhoneRequired',
  get: ({ get }) => get(settingsAtom)?.[0]?.forms__phone_required === 'true' || false,
});

export const quickChooseBackgroundAtom = selector({
  key: 'quickChooseBackground',
  get: ({ get }) => get(settingsAtom)?.[3]?.frontpage_quick_choose_background?.src || '',
});

export const isQuickViewAtom = selector<string>({
  key: 'isQuickView',
  get: ({ get }) => get(settingsAtom)?.[4]?.carbox_overlay_type || '',
});
export const customNavBannerAtom = selector({
  key: 'customnavbanner',
  get: ({ get }) => get(settingsAtom)?.[2]?.nav_banner_image?.src || '',
});
export const customNavBannerUrlAtom = selector({
  key: 'customnavbannerurl',
  get: ({ get }) => get(settingsAtom)?.[2]?.nav_banner_url || '',
});
export const customNavBannerPosition = selector({
  key: 'customnavbannerposition',
  get: ({ get }) => get(settingsAtom)?.[2]?.nav_banner_position || '',
});
export const navBannerTextAtom = selector({
  key: 'nav-banner-text',
  get: ({ get }) => (get(settingsAtom)?.[2]?.nav_banner_text ?? '') || '',
});
export const navBannerBgColorAtom = selector({
  key: 'navBannerBgColor',
  get: ({ get }) => (get(settingsAtom)?.[2]?.nav_banner_color_background ?? '') || '',
});
export const navBannerFontColorAtom = selector({
  key: 'navBannerFontColor',
  get: ({ get }) => (get(settingsAtom)?.[2]?.nav_banner_color_font ?? '') || '',
});
export const searchTopLink1TextAtom = selector({
  key: 'searchtoplink1text',
  get: ({ get }) => get(settingsAtom)?.[0]?.instantSearch_TopLink1_text || '',
});
export const searchTopLink1Atom = selector({
  key: 'searchtopurl1',
  get: ({ get }) => get(settingsAtom)?.[0]?.instantSearch_TopLink1_link || '',
});
export const searchTopLink2Atom = selector({
  key: 'searchtopurl2',
  get: ({ get }) => get(settingsAtom)?.[0]?.instantSearch_TopLink2_link || '',
});
export const searchTopText2Atom = selector({
  key: 'searchtoptext2',
  get: ({ get }) => get(settingsAtom)?.[0]?.instantSearch_TopLink2_text || '',
});
export const searchTopText3Atom = selector({
  key: 'searchTopText3',
  get: ({ get }) => get(settingsAtom)?.[0]?.instantSearch_TopLink3_text || '',
});
export const searchTopLink3Atom = selector({
  key: 'searchTopLink3',
  get: ({ get }) => get(settingsAtom)?.[0]?.instantSearch_TopLink3_link || '',
});
export const showKeyFeaturesAtom = selector({
  key: 'key-features',
  get: ({ get }) => get(settingsAtom)?.[4]?.carbox_show_priority_options_icons || '',
});
export const primaryFormTitleAtom = selector({
  key: 'form-title',
  get: ({ get }) => get(settingsAtom)?.[0]?.primary_lead_form__title || '',
});
export const primaryFormCtaTitleAtom = selector({
  key: 'form-cta-title',
  get: ({ get }) => get(settingsAtom)?.[0]?.primary_lead_form__primary__cta || '',
});
export const showConditionalCashIncentivesAtom = selector({
  key: 'show-conditional-cash-incentives',
  get: ({ get }) => get(settingsAtom)?.[4]?.show_conditional_cash_incentives || false,
});
export const frontpageSubheroHideAtom = selector({
  key: 'frontpageSubheroHide',
  get: ({ get }) => get(settingsAtom)?.[3]?.frontpage_subhero_hide || false,
});
export const frontpageSubheroHideDesktopAtom = selector({
  key: 'frontpageSubheroHideDesktop',
  get: ({ get }) => get(settingsAtom)?.[3]?.frontpage_subhero_desktop_only || false,
});

export const secondaryLogoAtom = selector({
  key: 'secondary-logo',
  get: ({ get }) => get(settingsAtom)?.[0]?.logo_secondary?.src || '',
});
export const vdpPriceStackThemeAtom = selector({
  key: 'vdp-price-stack-theme',
  get: ({ get }) => get(settingsAtom)?.[4]?.vdp__price_stack_theme || 'full_stack',
});

export const tagRailIdAtom = selector({
  key: 'tag-rail-id',
  get: ({ get }) => get(settingsAtom)?.[4]?.tagrail__id || '',
});

export const tagrailBtnDetailsAtom = selector({
  key: 'tag-rail-pricing-tool-layout',
  get: ({ get }) => {
    const tagRailBtnLayout = get(settingsAtom)?.[4];
    return {
      tagrailBtnDetails: tagRailBtnLayout?.tagrail__pricing_tool_layout || '',
      tagrailBtnBgColor: tagRailBtnLayout?.tagrail__btn_background || '',
      tagrailBtnPrimaryText: tagRailBtnLayout?.tagrail__btn_cta_primary || '',
      tagrailBtnSecondaryText: tagRailBtnLayout?.tagrail__btn_cta_secondary || '',
    };
  },
});

export const defaultDisclaimerAtom = selector({
  key: 'disclaimer_default',
  get: ({ get }) => get(settingsAtom)?.[4]?.disclaimer_default || '',
});
export const hideDefaultDisclaimerAtom = selector({
  key: 'disclaimer_inventory_default_hide',
  get: ({ get }) => get(settingsAtom)?.[4]?.disclaimer_inventory_default_hide || '',
});
export const disclaimerGasMileageAtom = selector({
  key: 'disclaimer-gas-mileage',
  get: ({ get }) => get(settingsAtom)?.[4]?.disclaimer_gas_mileage || '',
});
export const siteShowFavAtom = selector({
  key: 'site-show-favorites',
  get: ({ get }) => get(settingsAtom)?.[4]?.site__show_favorites || '',
});
export const showSrpFormAtom = selector({
  key: 'show-srp-form',
  get: ({ get }) => get(settingsAtom)?.[4]?.carbox_inline_form || false,
});
export const hideVdpFormAtom = selector({
  key: 'show-vdp-form',
  get: ({ get }) => get(settingsAtom)?.[4]?.vdp_form_primary_hide ?? true,
});
export const emailValidationAtom = selector({
  key: 'email-validation',
  get: ({ get }) => get(settingsAtom)?.[0]?.forms__email_required || '',
});
export const showTextareaAtom = selector({
  key: 'show-textarea',
  get: ({ get }) => get(settingsAtom)?.[0]?.show_lead_form_textarea || false,
});
export const paymentTypeAtom = selector({
  key: 'payment-type',
  get: ({ get }) => get(settingsAtom)?.[4]?.incentives_finance__term || false,
});
export const showHeadersecondaryNumberAtom = selector({
  key: 'show-header-secondary-num',
  get: ({ get }) => get(settingsAtom)?.[2]?.header_include_secondary_phone || false,
});
export const showHeaderTertiaryNumberAtom = selector({
  key: 'show-header-tertiary-num',
  get: ({ get }) => get(settingsAtom)?.[2]?.header_include_tertiary_phone || false,
});

export const hideInventoryCountAtom = selector({
  key: 'hide-inventory-count',
  get: ({ get }) => get(settingsAtom)?.[0]?.hide_inventory_count || false,
});
export const secondarySpecialTextAtom = selector({
  key: 'secondary-special-text',
  get: ({ get }) => get(settingsAtom)?.[4]?.carbox_specials_ribbon_default_text || '',
});
export const vehicleTitleFormatAtom = selector({
  key: 'vehicle-titles',
  get: ({ get }) =>
    get(settingsAtom)?.[4]
      ?.vehicle_title_arr.split(',')
      .map((v: string) => v.trim()) || ['certified', 'type', 'year', 'make', 'model', 'drivetrain', 'trim'],
});
export const vehicleDescriptionFormatAtom = selector({
  key: 'vehicle-desc',
  get: ({ get }) =>
    get(settingsAtom)?.[4]
      ?.vehicle_subtitle_arr.split(',')
      .map((v: string) => v.trim()) || [
      'trim',
      'friendlystyle',
      'standardbody',
      'drivetrain',
      'transdescription',
      'engdescription',
    ],
});
export const windowStickerPositionAtom = selector({
  key: 'windowStickerPosition',
  get: ({ get }) => get(settingsAtom)?.[4]?.show_window_sticker || '',
});
export const siteUnitAtom = selector({
  key: 'site-units',
  get: ({ get }) => get(settingsAtom)?.[0]?.site_units || '',
});
export const secondaryUsedDisclamerAtom = selector({
  key: 'used-disclaimer',
  get: ({ get }) => get(settingsAtom)?.[4]?.disclaimer_inventory_used || '',
});
export const secondaryNewDisclamerAtom = selector({
  key: 'new-disclaimer',
  get: ({ get }) => get(settingsAtom)?.[4]?.disclaimer_inventory_new || '',
});

export const hoursTitlesAtom = selector({
  key: 'hours-title',
  get: ({ get }) => {
    const settings = get(settingsAtom)?.[1] ?? {};
    return {
      hoursPriamryTitle: settings?.hours_title_primary ?? '',
      hoursSecondaryTitle: settings?.hours_title_secondary ?? '',
      hoursTertiaryTitle: settings?.hours_title_tertiary ?? '',
    };
  },
});

export const showFooterContactsAtom = selector({
  key: 'show-footer-contacts',
  get: ({ get }) => {
    const settings = get(settingsAtom)?.[2] ?? {};
    return {
      showSecondaryPhone: settings?.footer_include_secondary_phone ?? false,
      showTertiaryPhone: settings?.footer_include_tertiary_phone ?? false,
    };
  },
});

export const vdpHideAddonsAtom = selector({
  key: 'vdp-hide-addons',
  get: ({ get }) => get(settingsAtom)?.[4]?.vdp_hide_addons ?? true,
});

export const vdpHideIncentivesAtom = selector({
  key: 'vdp-hide-incentives',
  get: ({ get }) => get(settingsAtom)?.[4]?.vdp_hide_incentives ?? true,
});

export const landRoverSiteUrlAtom = selector({
  key: 'land-rover-site-url',
  get: ({ get }) => get(settingsAtom)?.[6]?.land_rover_site_url ?? '',
});
export const jaguarSiteUrlAtom = selector({
  key: 'jaguar-site-url',
  get: ({ get }) => get(settingsAtom)?.[6]?.jaguar_site_url ?? '',
});
export const carboxShowTextSpecsAtom = selector({
  key: 'carbox-show-text-specs',
  get: ({ get }) => get(settingsAtom)?.[4]?.carbox_show_text_specs === 'true' || false,
});
export const showVdpdealerDiscountAtom = selector({
  key: 'show-vdp-dealer-discount',
  get: ({ get }) => !get(settingsAtom)?.[4]?.vdp_hide_dealer_discount || false,
});
export const showVdpTotalDiscountsAtom = selector({
  key: 'show-vdp-total-discount',
  get: ({ get }) => get(settingsAtom)?.[4]?.vdp_hide_total_savings === true || false,
});
export const showFrontpageSliderOnlyOnDesktopAtom = selector({
  key: 'frontpage-heroSlider-show-desktop-only',
  get: ({ get }) => get(settingsAtom)?.[3]?.frontpage_heroSlider_show_desktop_only || false,
});
export const socialMediaTwitterUrl = selector({
  key: 'social-media-twitter-url',
  get: ({ get }) => get(settingsAtom)?.[1]?.social_url_twitter ?? '',
});
export const socialMediaFacebookUrl = selector({
  key: 'social-media-facebook-url',
  get: ({ get }) => get(settingsAtom)?.[1]?.social_url_facebook ?? '',
});
export const reviewsSourceAtom = selector({
  key: 'review-source',
  get: ({ get }) => get(settingsAtom)?.[0]?.reviews_source__reviews_page ?? '',
});
export const showReviewsAtom = selector({
  key: 'show-reviews',
  get: ({ get }) => get(settingsAtom)?.[0]?.reviews__version ?? '',
});
export const reserveFlagTextAtom = selector({
  key: 'reserve-text',
  get: ({ get }) => get(settingsAtom)?.[6]?.reserve_flag_text ?? '',
});
export const reserveFlagDisclamerAtom = selector({
  key: 'reserve-disclaimer',
  get: ({ get }) => get(settingsAtom)?.[6]?.reserve_flag_disclaimer ?? '',
});
export const reserveFlagOnAtom = selector({
  key: 'reserve-on',
  get: ({ get }) => get(settingsAtom)?.[6]?.reserve_flag_on === 'true' ?? false,
});

export const showMsrpDisclaimerAtom = selector({
  key: 'pricing-msrp-disclaimer-show-settings',
  get: ({ get }) => get(settingsAtom)?.[4]?.pricing_msrp_disclaimer_show_settings === 'true' ?? false,
});

export const msrpDisclaimerAtom = selector({
  key: 'pricing-msrp-disclaimer-settings',
  get: ({ get }) => get(settingsAtom)?.[4]?.pricing_msrp_disclaimer_settings ?? '',
});

export const srpMsrpDisclaimerAtom = selectorFamily({
  key: 'srp-pricing-msrp-disclaimer-settings',
  get: (type: string) => ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const dealerSites = [uniqueId.MBOFEDH, uniqueId.MBOFROCKLIN, uniqueId.LANDROVERCERRITOS];
    let msrpDisclaimer = '';
    if (siteUniqueId === uniqueId.TOYOTAOFLASVEGAS && type === 'used') {
      msrpDisclaimer = '+RECONDITIONING';
    }
    if (type === 'new' || dealerSites.includes(siteUniqueId)) {
      msrpDisclaimer = get(settingsAtom)?.[4]?.pricing_msrp_disclaimer_settings ?? '';
    }
    return msrpDisclaimer ?? '';
  },
});

export const addGA4GTMContainerAtom = selector({
  key: 'add-ga4-gtm-container',
  get: ({ get }) => get(settingsAtom)?.[5]?.add_ga4_gtm_container,
});

export const instantSearchActiveAtom = selector({
  key: 'instantSearch-is-active',
  get: ({ get }) => get(settingsAtom)?.[0]?.instantSearch__is_active === 'on' || false,
});

export const inTransitTextAtom = selector({
  key: 'in-transit-text',
  get: ({ get }) => (get(settingsAtom)?.[4]?.in_transit_text ?? '') || '',
});
export const paymentCalculatorStartingPercentage = selector({
  key: 'paymentCalculatorStartingPercentage',
  get: ({ get }) => (get(settingsAtom)?.[4]?.payment_calculator_starting_percentage ?? '') || '',
});
export const overrideFinanceRate = selector({
  key: 'overrideFinanceRate',
  get: ({ get }) => get(settingsAtom)?.[4]?.calc_override_incentives === 'true' || false,
});
export const carSaverCtaAtom = selector({
  key: 'car-saver-cta-details',
  get: ({ get }) => {
    const carSaverSettings = get(settingsAtom)?.[6];
    return {
      dealerId: carSaverSettings?.carSaver__dealerId ?? '',
      campaignId: carSaverSettings?.carSaver__campgaignId ?? '',
      btnText: carSaverSettings?.carSaver__btnText || 'Buy Now!',
      btnColor: carSaverSettings?.carSaver__btnColor ?? '',
      btnTextColor: carSaverSettings?.carSaver__btnTextColor ?? '',
      carSaverV2: carSaverSettings?.carSaver__v2 || false,
    };
  },
});

export const showIpacketBtnonSrpAtom = selectorFamily({
  key: 'showautoIpacketBtnonSrp',
  get: (type?: string) => ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const srpipacketToolSites = [
      uniqueId.HUDSONAUTO,
      ...(type?.toLowerCase?.() !== 'new' ? [uniqueId.LANDROVERFAIRFIELD] : []),
      ...(type?.toLowerCase() !== 'new' ? [uniqueId.JAGUARFAIRFIELD] : []),
      uniqueId.CINCINNATILANDROVER,
      uniqueId.JAGUARCINCINNATI,
      ...(type?.toLowerCase() !== 'new' ? [uniqueId.PRINCETONLANDROVER] : []),
      uniqueId.WESTCHESTERBENZ,
      uniqueId.MBCINCY,
    ];
    return srpipacketToolSites?.includes(siteUniqueId) ?? false;
  },
});

export const autoIpacketIdAtom = selectorFamily({
  key: 'autoIpacketId',
  get: (type?: string) => ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    let urlid = '';
    switch (siteUniqueId) {
      case uniqueId.HUDSONAUTO:
        urlid = '27D4CFC70F59DFD7AEC8';
        break;
      case uniqueId.LANDROVERFAIRFIELD:
      case uniqueId.JAGUARFAIRFIELD:
        urlid = '27D4CFC70F5ADCD3AE';
        break;
      case uniqueId.PRINCETONLANDROVER:
        urlid = '27D4CFC70F5BD9D1AE';
        break;
      case uniqueId.WESTCHESTERBENZ:
        urlid = '27D4CFC70F59DBD5AA';
        if (type?.toLowerCase() === 'new') {
          urlid = '27D4CFC70F59D9D0A4';
        }
        break;
      case uniqueId.MBCINCY:
        urlid = '27D4CFC70F59DED6A9';
        if (type?.toLowerCase() === 'new') {
          urlid = '27D4CFC70F59D9D0A5';
        }
        break;
    }
    return urlid;
  },
});

export const showIpacketToolonVdpAtom = selector({
  key: 'showIpacketToolonVdp',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const ipacketToolonVdpsites = [uniqueId.WESTCHESTERBENZ, uniqueId.MBCINCY];
    return ipacketToolonVdpsites?.includes?.(siteUniqueId) ?? false;
  },
});

export const iPacketToolApiKeyAtom = selector({
  key: 'iPacketToolApiKey',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const iPacketToolApiKeyMap: Record<string, string> = {
      [uniqueId.WESTCHESTERBENZ]: 'ec10487c-030f-4528-b4b8-f999fa16c9eb',
      [uniqueId.MBCINCY]: '1fc6f5ab-1867-403f-adce-0d61a5cdb4f9',
    };
    return iPacketToolApiKeyMap?.[siteUniqueId] ?? '';
  },
});

export const smartPathActiveAtom = selector({
  key: 'smart-path-active',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    // This is just for testing and time being, as currently not getting it from the customizer.
    // if (siteName === 'Johnson City Toyota' && process.env.APP_ENV !== 'production') return true;Spartanburg Toyota
    if ((siteUniqueId === uniqueId.NORWALKTOYOTA || siteUniqueId === uniqueId.TOYOTAWESTCOVINA || siteUniqueId === uniqueId.TOYOTAHUNTINGTONBEACH) && process.env.APP_ENV !== 'production') return true;
    return (get(settingsAtom)?.[6].smartpath_is_active ?? 'false') !== 'false';
  },
});
export const smartPathEnabledVehicleTypeAtom = selector({
  key: 'smartpath-enabled-vehicle-type',
  get: ({ get }) => get(settingsAtom)?.[6]?.smartpath_enabled_vehicle_type ?? 'both', //["both", "new", "used"]
});
export const smartPathDealerPriceAdjustmentTitleAtom = selector({
  key: 'smartpath-dealer-price-adjustment-title',
  get: ({ get }) => get(settingsAtom)?.[6]?.smartpath_dealer_price_adjustment_title ?? 'Dealer Adjustment',
});
export const smartPathShowLockUnlockCtaAtom = selector({
  key: 'smartpath_show_lock_unlock_cta',
  get: ({ get }) => get(settingsAtom)?.[6]?.smartpath_show_lock_unlock_cta ?? 'true',
});
export const smartPathLockCtaTitleAtom = selector({
  key: 'smartpath-lock-cta-title',
  get: ({ get }) => get(settingsAtom)?.[6]?.smartpath_lock_cta_title ?? 'Unlock Smart Price',
});
export const smartPathUnlockCtaTitleAtom = selector({
  key: 'smartpath-unlock-cta-title',
  get: ({ get }) => get(settingsAtom)?.[6]?.smartpath_unlock_cta_title ?? 'Confirm Availability',
});
export const smartPathShowEstimatePaymentCtaAtom = selector({
  key: 'smartpath-show-estimate-payment-cta',
  get: ({ get }) => get(settingsAtom)?.[6]?.smartpath_show_estimate_payment_cta ?? 'true',
});
export const smartPathEstimateCtaTitleAtom = selector({
  key: 'smartpath-estimate-cta-title',
  get: ({ get }) => get(settingsAtom)?.[6]?.smartpath_estimate_cta_title ?? 'Estimate Payments',
});
export const smartPathShowValueYourTradeCtaAtom = selector({
  key: 'smartpath-show-value-your-trade-cta',
  get: ({ get }) => get(settingsAtom)?.[6]?.smartpath_show_value_your_trade_cta ?? 'true',
});
export const smartPathValueYourTradeCtaTitleAtom = selector({
  key: 'smartpath-value-your-trade-cta-title',
  get: ({ get }) => get(settingsAtom)?.[6]?.smartpath_value_your_trade_cta_title ?? 'Value Your Trade',
});
export const smartPathTitleAtom = selector({
  key: 'smart-path-title',
  get: ({ get }) => get(settingsAtom)?.[6].smartpath_site_title ?? '',
});
export const smartPathOptionAtom = selector({
  key: 'smart-path-option',
  get: ({ get }) => (get(settingsAtom)?.[6].smartpath_option_one ?? 'false') !== 'false',
});
export const smartPathNewUnloackedAtom = selector({
  key: 'smart-path-new-unloacked',
  get: ({ get }) => (get(settingsAtom)?.[6].smartpath_new_unlocked ?? 'false') !== 'false',
});
export const showLeaseOfferFinePrintAtom = selector({
  key: 'showLeaseOfferFinePrint',
  get: ({ get }) => (get(settingsAtom)?.[4]?.show_lease_offer_fine_print ?? false) || false,
});

export const showFinanceOfferFinePrintAtom = selector({
  key: 'showFinanceOfferFinePrint',
  get: ({ get }) => (get(settingsAtom)?.[4]?.show_finance_offer_fine_print ?? false) || false,
});

export const showFinanceAndLeaseTabsAtom = selector({
  key: 'showFinanceAndLeaseTabs',
  get: ({ get }) => (get(settingsAtom)?.[4]?.srp_lease_finance_boxes ?? 'None') || 'None',
});

export const srpBannerDisclaimerPositionAtom = selector({
  key: 'srpBannerDisclaimer',
  get: ({ get }) => (get(settingsAtom)?.[4]?.srp_banner_disclaimer ?? 'button') || 'button',
});

export const canadaLuxTaxDisclaimer = selector({
  key: 'disclaimerCanada',
  get: ({ get }) => (get(settingsAtom)?.[4]?.disclaimer_canada ?? false) || false,
});

export const nissanShowTrimInTitleAtom = selector({
  key: 'nissanShowTrimInTitle',
  get: ({ get }) => (get(settingsAtom)?.[6]?.nissan_show_trim_in_title ?? false) || false,
});

export const nissanRelocatePackageHighlightsToUnderVehThumbsAtom = selector({
  key: 'nissanRelocatePackageHighlightsToUnderVehThumbs',
  get: ({ get }) => (get(settingsAtom)?.[6]?.nissan_relocate_package_highlights_under_v_thumbs ?? false) || false,
});

export const vdpShowTotalAddonsAtom = selector({
  key: 'vdpShowTotalAddons',
  get: ({ get }) => (get(settingsAtom)?.[4]?.vdp_show_total_addons ?? false) || false,
});

export const vdpShowTotalAddonsTextAtom = selector({
  key: 'vdpShowTotalAddonsText',
  get: ({ get }) => (get(settingsAtom)?.[4]?.vdp_show_total_addons_text ?? '') || '',
});

export const vdpShowSellingPriceAtom = selector({
  key: 'vdpShowSellingPrice',
  get: ({ get }) => (get(settingsAtom)?.[4]?.vdp_show_selling_price ?? false) || false,
});

export const sellingPriceTitleAtom = selector({
  key: 'sellingPriceTitle',
  get: ({ get }) => (get(settingsAtom)?.[4]?.pricing_title_selling_price ?? '') || '',
});

export const hideVdpTotalSavingsAtom = selector({
  key: 'hideVdpTotalSaving',
  get: ({ get }) => get(settingsAtom)?.[4]?.vdp_hide_total_savings || false,
});

export const vdpShowTotalIncentivesAtom = selector({
  key: 'vdpShowTotalIncentives',
  get: ({ get }) => get(settingsAtom)?.[4]?.vdp_show_total_incentives || false,
});

export const vdpShowConditionalPriceAtom = selector({
  key: 'vdpShowConditionalPrice',
  get: ({ get }) => get(settingsAtom)?.[4]?.vdp_show_conditional_price || false,
});

export const pricingTitleConditionalPriceAtom = selector({
  key: 'pricingTitleConditionalPrice',
  get: ({ get }) => get(settingsAtom)?.[4]?.pricing_title_conditional_price || false,
});

export const footerSiteLogoAtom = selector({
  key: 'footerSiteLogo',
  get: ({ get }) => (get(settingsAtom)?.[2]?.footer_logo ?? 'primary') || 'primary',
});

export const tripleStackFinalFinancePriceTextAtom = selector({
  key: 'tripleStackFinalFinancePriceText',
  get: ({ get }) => (get(settingsAtom)?.[4]?.triple_stack__final_price_text_finance ?? 'primary') || 'primary',
});

export const tripleStackFinalLeasePriceTextAtom = selector({
  key: 'tripleStackFinalLeasePriceText',
  get: ({ get }) => (get(settingsAtom)?.[4]?.triple_stack__final_price_text_lease ?? 'primary') || 'primary',
});

export const tripleStackTitleContentAtom = selector({
  key: 'tripleStackTitleContent',
  get: ({ get }) => (get(settingsAtom)?.[4]?.triple_stack__title_content ?? 'total') || 'total',
});

export const tripleStackFrequencyOnLoadAtom = selector({
  key: 'tripleStackFrequencyOnLoad',
  get: ({ get }) =>
    (get(settingsAtom)?.[4]?.triple_stack__frequency_open_on_load ?? 'monthlyPayment') || 'monthlyPayment',
});

export const tripleStackPaymentScheduleAtom = selector({
  key: 'tripleStackPaymentSchedule',
  get: ({ get }) => (get(settingsAtom)?.[4]?.triple_stack__payment_schedule ?? 'monthlyPayment') || 'monthlyPayment',
});

export const tripleStackDisclaimerThemeAtom = selector({
  key: 'tripleStackDisclaimerTheme',
  get: ({ get }) => (get(settingsAtom)?.[4]?.triple_stack__disclaimer_theme ?? 'exposed') || 'exposed',
});

export const priceStackUseSrpHtmlAtom = selector({
  key: 'priceStackUseSrpHtml',
  get: ({ get }) => (get(settingsAtom)?.[4]?.price_stack__use_html ?? false) || false,
});
export const vdpDescriptionAtom = selector({
  key: 'vdpDescription',
  get: ({ get }) => (get(settingsAtom)?.[4]?.vdp_description ?? 'description') || 'description',
});
export const hideActiveTabAtom = selector({
  key: 'hideActiveTabOnVdp',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    const hideActiveTabOnVdp = [''];
    return hideActiveTabOnVdp?.includes?.(siteUniqueId) ? true : false;
  },
});

export const setOffersTabActiveAtom = selector({
  key: 'showOffersTabActiveOnVdp',
  get: ({ get }) => {
    const siteId = get(siteUniqueIdAtom);
    const showOffersTabActiveOnVdp = [uniqueId.HILLTOPNISSAN, uniqueId.ROCKHILLNISSAN];
    return showOffersTabActiveOnVdp?.includes?.(siteId);
  },
});

export const discountColorAtom = selector({
  key: 'discountColorAtom',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    if (siteUniqueId === uniqueId.HILLTOPNISSAN) {
      return '#29BD15';
    } else {
      return '#000';
    }
  },
});

export const hpBannerSettingsAtom = selector({
  key: 'hpBannerSettings',
  get: ({ get }) => {
    const hpBannerSettings = get(settingsAtom)?.[3] ?? {};
    return {
      autoPlay: hpBannerSettings?.frontpage_heroSlider_autoplay === 'true',
      autoplaySpeed: Number(hpBannerSettings?.frontpage_heroSlider_autoplaySpeed) ?? 3000,
      sliderSpeed: Number(hpBannerSettings?.frontpage_heroSlider_speed) ?? 400,
      transitionType: hpBannerSettings?.frontpage_heroSlider_transitionType ?? 'slide',
    };
  },
});

export const pricingMsrpStrikeThroughAtom = selector({
  key: 'pricingMsrpStrikeThrough',
  get: ({ get }) => (get(settingsAtom)?.[4]?.pricing_msrp_strikethrough ?? 'none') || 'none',
});

export const omitFirstSliderImageAtom = selector<boolean>({
  key: 'omitFirstSliderImage',
  get: ({ get }) => (get(settingsAtom)?.[4]?.vehicle_image__used_omit_first_image ?? 'false') === 'true',
});
export const showRockHillHpVideo = selector({
  key: 'show-hp-video',
  get: ({ get }) => get(settingsAtom)?.[7]?.show_video ?? false,
});
export const RockHillHpVideoAutoPlay = selector({
  key: 'hp-video-autoplay',
  get: ({ get }) => get(settingsAtom)?.[7]?.autoplay ?? false,
});
export const RockHillHpVideoUrl = selector({
  key: 'hp-video-url',
  get: ({ get }) => get(settingsAtom)?.[7]?.video_url ?? '',
});
export const toyotaInTransitDisc = selector({
  key: 'toyota-in-transit-disc',
  get: ({ get }) => get(settingsAtom)?.[6]?.show_in_transit_disclaimer ?? '',
});
export const ctaQuickViewLearnMoreTextAtom = selector({
  key: 'cta_quickView__learnMore__text',
  get: ({ get }) => get(settingsAtom)?.[4]?.cta_quickView__learnMore__text ?? '',
});
export const textFeatureAtom = selector({
  key: 'vdp-text-feature',
  get: ({ get }) => get(settingsAtom)?.[7]?.text_form ?? false,
});

export const vdpThemeAtom = selector({
  key: 'vdp-theme',
  get: ({ get }) => get(settingsAtom)?.[4].vdp_theme ?? 'original',
});
export const showDiscDateAtom = selector({
  key: 'shotDiscDate',
  get: ({ get }) => get(settingsAtom)?.[7]?.disc_date || '',
});
export const discDateFilterAtom = selector({
  key: 'discDateFilter',
  get: ({ get }) => get(settingsAtom)?.[7]?.filter_type || '',
});
export const discDateTextAtom = selector({
  key: 'discDateText',
  get: ({ get }) => get(settingsAtom)?.[7]?.disc_text || '',
});
export const enableGravityFormApiVixenAtom = selector({
  key: 'enableGravityFormApiVixen',
  get: ({ get }) => get(settingsAtom)?.[0]?.enable_gravity_form_api_vixen ?? false,
});
export const tripleStackTermLengthAtom = selector({
  key: ' tripleStackTermLength',
  get: ({ get }) => {
    const financeLengths = get(settingsAtom)?.[4]?.triple_stack__term_length_finance ?? '';
    const leaseLengths = get(settingsAtom)?.[4]?.triple_stack__term_length_lease ?? '';
    return {
      financeTerm: financeLengths ? financeLengths?.split?.(',') || [] : [],
      leaseTerm: leaseLengths ? leaseLengths?.split?.(',') || [] : [],
    };
  },
});
export const srpPromoPositionAtom = selector({
  key: 'srpPromoPosition',
  get: ({ get }) => Number(get(settingsAtom)?.[4]?.srp_promo_item_position) ?? 3,
});

export const searchRestrictByTypeAtom = selector({
  key: 'searchRestrictByType',
  get: ({ get }) => get(settingsAtom)?.[0]?.search__restrict_by_type ?? false,
});

export const isDdoaActiveAtom = selector({
  key: 'isDdoaActive',
  get: ({ get }) => get(settingsAtom)?.[6]?.ddoa_is_active === 'true' ?? false,
});
