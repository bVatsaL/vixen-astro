import Phoneicon from '@resources/svg-icons/phone.svg';
import Locationicon from '@resources/svg-icons/location.svg';
import { useRecoilValue } from 'recoil-ssr';
import { addressAtom, googleAddressUrlAtom, primaryPhoneAtom, secondaryPhoneAtom } from 'src/stores/location.atom';
import { useCallRail } from '@hooks/useCallRail';
import { phonePrimaryTitleAtom, secondaryPrimaryTitleAtom } from 'src/stores/global-settings.atom';
import styles from './styles.scss';

export const HeaderContactDetails: React.FC<any> = () => {
  const salesContact = useRecoilValue(primaryPhoneAtom);
  const secondaryContact = useRecoilValue(secondaryPhoneAtom);
  const address = useRecoilValue(addressAtom);
  const googleAddressUrl = useRecoilValue(googleAddressUrlAtom);
  const primaryTitle = useRecoilValue(phonePrimaryTitleAtom);
  const secondaryTitle = useRecoilValue(secondaryPrimaryTitleAtom);
  useCallRail();
  return (
    <address className={styles.contact_Info}>
      <a
        href={`tel:${salesContact}`}
        data-events='clickToCall'
        data-vehicle-details=''
        data-click-to-call-department='Sales'
        data-fda-action='click/touch'
        className={styles.contact_Info_Link}
      >
        <img src={Phoneicon} alt='phoneIcon' />
        <span className={styles.phone_Number}>
          <b> {primaryTitle} </b> {salesContact}
        </span>
        <span className={styles.d_None}>Call Reception</span>
      </a>
      <a
        href={`tel:${secondaryContact}`}
        data-events='clickToCall'
        data-vehicle-details=''
        data-click-to-call-department='Service'
        data-fda-action='click/touch'
        className={styles.contact_Info_Link}
      >
        <img src={Phoneicon} alt='phoneIcon' />
        <span className={styles.phone_Number}>
          <b> {secondaryTitle} </b> {secondaryContact}
        </span>
        <span className={styles.d_None}>Call Service</span>
      </a>
      <a
        target='_blank'
        href={googleAddressUrl}
        className={styles.contact_Info_Link}
        data-events='getDirections'
        rel='noreferrer'
      >
        <img src={Locationicon} alt='locationIcon' />
        <span className={styles.street_Address}>{address}</span>
        <span className={styles.d_None}>Call Directions</span>
      </a>
    </address>
  );
};
