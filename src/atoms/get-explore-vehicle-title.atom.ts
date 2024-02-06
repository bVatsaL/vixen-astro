import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import { uniqueId } from '@utils/constant';

export const exploreVehicleTitleAtom = selector<string>({
  key: 'exploreVehicleTitle',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);

    // Define a lookup object for the mappings
    const titleMappings = {
      [uniqueId.VIXENTOYOTADEMO]: 'Explore The Toyota Lineup',
      [uniqueId.ROCKYMOUNTTOYOTA]: 'Explore The Toyota Lineup',
      // Add more mappings as needed
    };

    // Set the default title if no match is found
    const defaultTitle = 'Explore All Vehicles';

    // Use the lookup object to get the title or fallback to the default
    const vehicleTitle = titleMappings[siteUniqueId] || defaultTitle;

    return vehicleTitle;
  },
});
