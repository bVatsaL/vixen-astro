import { trackAscEvent } from "./analytics.util";

export const getSrpStaticButtonsBySiteName = (siteName?: string) => {
  switch (siteName) {
    case 'South Fort Chevrolet':
      return [
        {
          title: 'Get Best Price',
          isModal: true,
          modalId: 'BEST_PRICE_MODAL',
        },
        {
          title: 'Apply for Financing',
          isModal: false,
          url: '/finance-application/',
          isOnClick: true,
          onClick: (title: string, navigate: any) => () => {
            trackAscEvent('asc_cta_interaction', {
              event: 'asc_cta_interaction',
              element_text: title,
              link_url: window?.location?.href ?? '',
              event_action: 'click',
              event_action_result: 'redirect',
              element_type: 'Subhero click',
              item_mode: (title ?? '').toLowerCase(),
              page_type: 'inventory',
            });
            navigate('/finance-application/');
          },
        },
        {
          title: 'Shop Accessories',
          isModal: false,
          url: '/accessories/',
        },
      ];
    case 'Barrhead Ford':
    case 'Whitecourt Ford':
      return [
        {
          title: 'Schedule Test Drive',
          isModal: true,
          modalId: 'FORD_SCHEDULE_DRIVE_MODAL',
          modalTitle: 'SCHEDULE TEST DRIVE',
        },
      ];
    case 'Land Rover Ventura':
      return [
        {
          title: 'Get Pre-Qualified',
          isModal: false,
          url: '/credit-application/ ',
        },
      ];
    case 'Jaguar Ventura':
      return [
        {
          title: 'Get Pre-Qualified',
          isModal: false,
          url: '/credit-application/ ',
        },
      ];
      case 'Mercedes-Benz of Sacramento':
      return [
        {
          title: 'Value Your Trade',
          isModal: false,
          url: '/value-your-trade/',
        },
      ];
    default:
      return [];
  }
};
