
export type CouponItem = {
  coupon__expiration: string;
  coupon__image: {
    media_library?: {
      src?: string;
    };
  };
  coupon__cta: string;
  coupon__price: string;
  coupon__subtitle: string;
  coupon__disclaimer: string;
};
export type CouponType = {
  coupon__additional_price: string;
  coupon__additional_price_text: string;
  coupon__bullet_eight: string;
  coupon__bullet_five: string;
  coupon__bullet_four: string;
  coupon__bullet_one: string;
  coupon__bullet_seven: string;
  coupon__bullet_six: string;
  coupon__bullet_three: string;
  coupon__bullet_two: string;
  'coupon__coupon - code': string;
  coupon__cta: string;
  coupon__description: string
  coupon__disclaimer: string;
  coupon__expiration: string;
  coupon__image: {
    media_library: {
      id: number;
      src: string
    }
  }
  coupon__price: string
  coupon__price_text: string
  coupon__start_date: string
  coupon__subtitle: string
  coupon__target: boolean
  coupon__title: string
  coupon__url: string
};
