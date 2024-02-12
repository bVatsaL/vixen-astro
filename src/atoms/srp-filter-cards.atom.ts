import { selector } from 'recoil-ssr';
import { siteUniqueIdAtom } from './site.atom';
import Price from '@components/srp-filters-cards/images/price.svg';
import { uniqueId } from '@utils/constant';

export const filterCardsDataAtom = selector({
  key: 'filterCardsData',
  get: ({ get }) => {
    const siteUniqueId = get(siteUniqueIdAtom);
    let filterCardsData: any;

    switch (siteUniqueId) {
      case uniqueId.MLADYNISSAN:
      case uniqueId.MYGASTONIANISSAN:
      case uniqueId.NISSANDEMOV3:
        filterCardsData = {
          Price: Price,
          Condition: require('@components/srp-filters-cards/images/m-condition.svg'),
          Make: require('@components/srp-filters-cards/images/m-condition.svg'),
          Model: require('@components/srp-filters-cards/images/m-modal.svg'),
          Color: require('@components/srp-filters-cards/images/lr-color.svg'),
          InteriorColor: require('@components/srp-filters-cards/images/lr-color.svg'),
          BodyStyle: require('@components/srp-filters-cards/images/lr-bodystyle.svg'),
          Drivetrain: require('@components/srp-filters-cards/images/lr-drivetrain.svg'),
          Year: require('@components/srp-filters-cards/images/m-year.svg'),
          Trim: require('@components/srp-filters-cards/images/lr-trim.svg'),
          Mileage: require('@components/srp-filters-cards/images/lr-milage.svg'),
          Engine: require('@components/srp-filters-cards/images/lr-engine.svg'),
          FuelType: require('@components/srp-filters-cards/images/m-fueltype.svg'),
          CityMPG: require('@components/srp-filters-cards/images/m-fueltype.svg'),
          HighwayMPG: require('@components/srp-filters-cards/images/m-fueltype.svg'),
          Options: require('@components/srp-filters-cards/images/lr-options.svg'),
          Location: require('@components/srp-filters-cards/images/lr-location.svg'),
          Packages: require('@components/srp-filters-cards/images/lr-bodystyle.svg'),
          Specials: Price,
        };
        break;
      case uniqueId.MYCARPARK:
        filterCardsData = {
          Price: Price,
          Condition: require('@components/srp-filters-cards/images/m-condition.svg'),
          Color: require('@components/srp-filters-cards/images/lr-color.svg'),
          Year: require('@components/srp-filters-cards/images/mc-Year.svg'),
          BodyStyle: require('@components/srp-filters-cards/images/mc-BodyStyle.svg'),
          Make: require('@components/srp-filters-cards/images/mc-make.svg'),
          Model: require('@components/srp-filters-cards/images/mc-Model.svg'),
          Trim: require('@components/srp-filters-cards/images/mc-Trim.svg'),
          Feature: require('@components/srp-filters-cards/images/mc-features.svg'),
          Options: require('@components/srp-filters-cards/images/mc-Options.svg'),
          Engine: require('@components/srp-filters-cards/images/mc-Engine.svg'),
          Drivetrain: require('@components/srp-filters-cards/images/mc-drivetrain.svg'),
          CityMPG: require('@components/srp-filters-cards/images/mc-CityMPG.svg'),
          HighwayMPG: require('@components/srp-filters-cards/images/mc-hightwayMPG.svg'),
          Location: require('@components/srp-filters-cards/images/mc-location.svg'),
          Mileage: require('@components/srp-filters-cards/images/mc-mileage.svg'),
          FuelType: require('@components/srp-filters-cards/images/m-fueltype.svg'),
          InteriorColor: require('@components/srp-filters-cards/images/lr-color.svg'),
        };
        break;
      case uniqueId.JAGUARCERRITOS:
        filterCardsData = {
          Price: Price,
          Condition: require('@components/srp-filters-cards/images/m-condition.svg'),
          Make: require('@components/srp-filters-cards/images/j-make.svg'),
          Model: require('@components/srp-filters-cards/images/j-model.svg'),
          Color: require('@components/srp-filters-cards/images/j-color.svg'),
          InteriorColor: require('@components/srp-filters-cards/images/j-color.svg'),
          BodyStyle: require('@components/srp-filters-cards/images/j-bodystyle.svg'),
          Drivetrain: require('@components/srp-filters-cards/images/j-drivetrain.svg'),
          Year: require('@components/srp-filters-cards/images/j-year.svg'),
          Trim: require('@components/srp-filters-cards/images/j-trim.svg'),
          Mileage: require('@components/srp-filters-cards/images/j-milage.svg'),
          Engine: require('@components/srp-filters-cards/images/j-engine.svg'),
          FuelType: require('@components/srp-filters-cards/images/j-fueltype.svg'),
          Options: require('@components/srp-filters-cards/images/j-options.svg'),
          Location: require('@components/srp-filters-cards/images/j-location.svg'),
        };
        break;
      case uniqueId.LANDROVERCERRITOS:
        filterCardsData = {
          Price: Price,
          Make: require('@components/srp-filters-cards/images/lr-make.svg'),
          Model: require('@components/srp-filters-cards/images/lr-model.svg'),
          Color: require('@components/srp-filters-cards/images/lr-color.svg'),
          InteriorColor: require('@components/srp-filters-cards/images/lr-color.svg'),
          BodyStyle: require('@components/srp-filters-cards/images/lr-bodystyle.svg'),
          Drivetrain: require('@components/srp-filters-cards/images/lr-drivetrain.svg'),
          Year: require('@components/srp-filters-cards/images/lr-year.svg'),
          Trim: require('@components/srp-filters-cards/images/lr-trim.svg'),
          Mileage: require('@components/srp-filters-cards/images/lr-milage.svg'),
          Engine: require('@components/srp-filters-cards/images/lr-engine.svg'),
          FuelType: require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          Options: require('@components/srp-filters-cards/images/lr-options.svg'),
          Location: require('@components/srp-filters-cards/images/lr-location.svg'),
        };
        break;
      case uniqueId.MERCEDESBENZDEMO:
        filterCardsData = {
          Price: Price,
          Condition: require('@components/srp-filters-cards/images/m-condition.svg'),
          Make: require('@components/srp-filters-cards/images/m-condition.svg'),
          Model: require('@components/srp-filters-cards/images/m-modal.svg'),
          Color: require('@components/srp-filters-cards/images/lr-color.svg'),
          InteriorColor: require('@components/srp-filters-cards/images/lr-color.svg'),
          BodyStyle: require('@components/srp-filters-cards/images/lr-bodystyle.svg'),
          Drivetrain: require('@components/srp-filters-cards/images/lr-drivetrain.svg'),
          Year: require('@components/srp-filters-cards/images/m-year.svg'),
          Trim: require('@components/srp-filters-cards/images/lr-trim.svg'),
          Mileage: require('@components/srp-filters-cards/images/lr-milage.svg'),
          Engine: require('@components/srp-filters-cards/images/lr-engine.svg'),
          FuelType: require('@components/srp-filters-cards/images/m-fueltype.svg'),
          Options: require('@components/srp-filters-cards/images/lr-options.svg'),
          Location: require('@components/srp-filters-cards/images/lr-location.svg'),
        };
        break;
      case uniqueId.WESTCHESTERBENZ:
      case uniqueId.MBCINCY:
        filterCardsData = {
          Condition: require('@components/srp-filters-cards/images/m-condition.svg'),
          Price: Price,
          Make: require('@components/srp-filters-cards/images/m-condition.svg'),
          Model: require('@components/srp-filters-cards/images/m-modal.svg'),
          Color: require('@components/srp-filters-cards/images/lr-color.svg'),
          InteriorColor: require('@components/srp-filters-cards/images/lr-color.svg'),
          BodyStyle: require('@components/srp-filters-cards/images/lr-bodystyle.svg'),
          Drivetrain: require('@components/srp-filters-cards/images/lr-drivetrain.svg'),
          Year: require('@components/srp-filters-cards/images/m-year.svg'),
          Trim: require('@components/srp-filters-cards/images/lr-trim.svg'),
          Mileage: require('@components/srp-filters-cards/images/lr-milage.svg'),
          Engine: require('@components/srp-filters-cards/images/lr-engine.svg'),
          FuelType: require('@components/srp-filters-cards/images/m-fueltype.svg'),
          CityMPG: require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          HighwayMPG: require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          Location: require('@components/srp-filters-cards/images/lr-location.svg'),
          Options: require('@components/srp-filters-cards/images/lr-options.svg'),
        };
        break;
      case uniqueId.MBESCONDIDO:
        filterCardsData = {
          Price: Price,
          Make: require('@components/srp-filters-cards/images/m-condition.svg'),
          Model: require('@components/srp-filters-cards/images/m-modal.svg'),
          Color: require('@components/srp-filters-cards/images/lr-color.svg'),
          BodyStyle: require('@components/srp-filters-cards/images/lr-bodystyle.svg'),
          Drivetrain: require('@components/srp-filters-cards/images/lr-drivetrain.svg'),
          Year: require('@components/srp-filters-cards/images/m-year.svg'),
          Trim: require('@components/srp-filters-cards/images/lr-trim.svg'),
          Mileage: require('@components/srp-filters-cards/images/lr-milage.svg'),
          Engine: require('@components/srp-filters-cards/images/lr-engine.svg'),
          FuelType: require('@components/srp-filters-cards/images/m-fueltype.svg'),
          Options: require('@components/srp-filters-cards/images/lr-options.svg'),
          Location: require('@components/srp-filters-cards/images/lr-location.svg'),
        };
        break;
      case uniqueId.MBOFROCKLIN:
        filterCardsData = {
          Price: Price,
          Make: require('@components/srp-filters-cards/images/m-condition.svg'),
          Model: require('@components/srp-filters-cards/images/m-modal.svg'),
          Color: require('@components/srp-filters-cards/images/lr-color.svg'),
          ExteriorColor: require('@components/srp-filters-cards/images/lr-color.svg'),
          BodyStyle: require('@components/srp-filters-cards/images/lr-bodystyle.svg'),
          Drivetrain: require('@components/srp-filters-cards/images/lr-drivetrain.svg'),
          Year: require('@components/srp-filters-cards/images/m-year.svg'),
          Trim: require('@components/srp-filters-cards/images/lr-trim.svg'),
          Mileage: require('@components/srp-filters-cards/images/lr-milage.svg'),
          Engine: require('@components/srp-filters-cards/images/lr-engine.svg'),
          FuelType: require('@components/srp-filters-cards/images/m-fueltype.svg'),
          CityMPG: require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          HighwayMPG: require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          Options: require('@components/srp-filters-cards/images/lr-options.svg'),
          Location: require('@components/srp-filters-cards/images/lr-location.svg'),
        };
        break;
      case uniqueId.MBOFEDH:
        filterCardsData = {
          Price: Price,
          Condition: require('@components/srp-filters-cards/images/m-condition.svg'),
          Make: require('@components/srp-filters-cards/images/m-condition.svg'),
          Model: require('@components/srp-filters-cards/images/m-modal.svg'),
          Color: require('@components/srp-filters-cards/images/lr-color.svg'),
          ExteriorColor: require('@components/srp-filters-cards/images/lr-color.svg'),
          InteriorColor: require('@components/srp-filters-cards/images/lr-color.svg'),
          BodyStyle: require('@components/srp-filters-cards/images/lr-bodystyle.svg'),
          Drivetrain: require('@components/srp-filters-cards/images/lr-drivetrain.svg'),
          Year: require('@components/srp-filters-cards/images/m-year.svg'),
          Trim: require('@components/srp-filters-cards/images/lr-trim.svg'),
          Mileage: require('@components/srp-filters-cards/images/lr-milage.svg'),
          Engine: require('@components/srp-filters-cards/images/lr-engine.svg'),
          FuelType: require('@components/srp-filters-cards/images/m-fueltype.svg'),
          CityMPG: require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          HighwayMPG: require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          Options: require('@components/srp-filters-cards/images/lr-options.svg'),
          Location: require('@components/srp-filters-cards/images/lr-location.svg'),
          Specials: Price,
        };
        break;
      default:
        filterCardsData = {
          Drivetrain: require('@components/srp-filters-cards/images/lr-drivetrain.svg'),
          Mileage: require('@components/srp-filters-cards/images/lr-milage.svg'),
          Condition: require('@components/srp-filters-cards/images/m-condition.svg'),
          Price: Price,
          Make: require('@components/srp-filters-cards/images/m-condition.svg'),
          Model: require('@components/srp-filters-cards/images/m-modal.svg'),
          Color: require('@components/srp-filters-cards/images/lr-color.svg'),
          InteriorColor: require('@components/srp-filters-cards/images/lr-color.svg'),
          BodyStyle: require('@components/srp-filters-cards/images/lr-bodystyle.svg'),
          Year: require('@components/srp-filters-cards/images/m-year.svg'),
          Trim: require('@components/srp-filters-cards/images/lr-trim.svg'),
          Category: require('@components/srp-filters-cards/images/lr-trim.svg'),
          Engine: require('@components/srp-filters-cards/images/lr-engine.svg'),
          FuelType: require('@components/srp-filters-cards/images/m-fueltype.svg'),
          CityMPG: require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          HighwayMPG: require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          Options: require('@components/srp-filters-cards/images/lr-options.svg'),
          Location: require('@components/srp-filters-cards/images/lr-location.svg'),
          Kilometers: require('@components/srp-filters-cards/images/lr-milage.svg'),
          Packages: require('@components/srp-filters-cards/images/lr-bodystyle.svg'),
          'CityL/100KM': require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          'HighwayL/100KM': require('@components/srp-filters-cards/images/lr-fueltype.svg'),
          Specials: Price,
        };
    }

    return filterCardsData;
  },
});
