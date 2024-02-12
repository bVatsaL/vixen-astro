import { trackAscEvent } from '@utils/analytics.util';
import Swiper from 'swiper';

export function useOnSlideChange() {
  return (swiper: Swiper) => {
    const slide = swiper.slides[swiper.activeIndex];
    if (slide instanceof HTMLElement) {
      const data = slide.dataset;
      if (data?.track) {
        trackAscEvent(`asc_media_interaction_${Date.now()}`, {
          creative_name: data?.title ?? '',
          event: 'asc_media_interaction',
          event_action_result: data?.fdaAction ?? 'click/touch',
          link_url: data.linkUrl,
          media_type: data?.mediaType,
          page_type: window?.asc_datalayer?.page_type ?? 'custom',
        });
      }
    }
  };
}
