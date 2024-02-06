export const getCertifiedLogobyMake = (make?: string) => {
  let logo = '';
  if (make === 'acura') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_acura_13ea7aa2ea.png';
  }
  if (make === 'chevrolet') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/certified_chev_logo_75b68812c7.png';
  }
  if (make === 'cadillac') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/wolfe_Cadillac_CPO_Badge_263c2f9bb3.png';
  }
  if (make === 'chrysler' || make === 'dodge' || make === 'jeep' || make === 'ram') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_chrysler_0c44c702c8.png';
  }
  if (make === 'ford') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_ford_14118537cc.png';
  }
  if (make === 'honda') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_honda_d1ec73cc3a.png';
  }
  if (make === 'hyundai') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_hyundai_fb9c53c033.png';
  }
  if (make === 'infiniti') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_infiniti_1021b27dad.png';
  }
  if (make === 'kia') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_kia_b29dbc48ea.png';
  }
  if (make === 'lexus') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_lexus_0b9dd242e7.png';
  }
  if (make === 'mazda') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_mazda_04d64f38d9.png';
  }
  if (make === 'mercedes-benz') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_mercedes_benz_14544c2e4c.png';
  }
  if (make === 'Buick') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/buick_certified_logo_5550ec3c41.png';
  }
  if (make === 'gmc') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/gmc_certified_logo_25bcb56832.png';
  }
  if (make === 'nissan') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/nissan_certified_logo_812f8298c2.png';
  }
  if (make === 'toyota') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_toyota_3c3a5dc714.png';
  }
  if (make === 'volvo') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_volvo_3c5e21ce0f.png';
  }
  if (make === 'volkswagen') {
    logo = 'https://cdn-pods.foxdealer.com/hudsonautogroup2/cpo_badge_volkswagen_d1f492fdda.png';
  }
  return logo;
};
