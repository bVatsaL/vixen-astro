import { atom, computed } from 'nanostores';
import { $siteUniqueId } from './site-config';
import { $defaultCarModels } from './search';
import { uniqueId } from '@utils/constant';

export const $settings = atom<Record<string, unknown> | any>({});

export const $siteLogo = atom<string>(
  'https://cdn-pods.foxdealer.com/hudsonautogroup2/Hudson_Logo_2401_HORZ_2_C_LIGHT_1_357e6997bf_28d4f7a889.png'
);

export const $srpAutotype = computed(
  [$siteUniqueId, $defaultCarModels, $settings],
  (siteUniqueId, models, settings) => {
    const newModelsList = models?.map((c: { display_name?: string; item?: string }) => c?.display_name);
    const { autotype_1: a1, autotype_2: a2, autotype_3: a3 } = settings?.[0] ?? {};
    return siteUniqueId === uniqueId.TOYOTAOFLASVEGAS && ![a1, a2, a3]?.filter(Boolean)?.length
      ? newModelsList
      : [a1, a2, a3].filter(Boolean);
  },
);
