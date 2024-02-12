import { type TimeData } from 'src/stores/settings.atom';
import { useCallRail } from '@hooks/useCallRail';
import { getExtraClasses } from '@utils/common.util';
import cn from 'classnames';
import { ContactTimeList } from './contact-timings';
import styles from './styles.module.scss';

interface IContactTimeSidebar {
  salesPhone?: string;
  servicePhone?: string;
  partsPhone?: string;
  className?: any;
  googleAddress?: string;
  day?: string;
  time?: any;
  address?: string;
  contact?: string;
  partsData?: TimeData;
  collisionData?: TimeData;
  salesData?: TimeData;
  serviceData?: TimeData;
  classNameAddress?: string;
  parts?: string;
  contactClassName?: string;
  financeDetails?: TimeData;
  service?: string;
  salesPhoneTitle?: string;
  servicePhoneTitle?: string;
  collisionPhone?: string;
  collision?: string;
  lubeLaneData?: TimeData;
  lastServiceAccepted?: TimeData;
  showContactEmail?: boolean;
  salesNote?: string;
  secondarySalesPhone?: string;
  secondaryServicePhone?: string;
  secondaryPartsPhone?: string;
  isAccordion?: boolean;
  defaultOpenSales?: boolean;
  defaultOpenService?: boolean;
  defaultOpenParts?: boolean;
  defaultOpenFinance?: boolean;
  defaultOpenLastService?: boolean;
  defaultOpenLubeLane?: boolean;
  accordionClassName?: string;
  accordionContentClassName?: string;
  accordionTitleClassName?: string;
  accordionActiveClassName?: string;
  contactUsTitle?: string;
  showText?: boolean;
  showAddress?: boolean;
  topTitle?: string;
  t?: (key?: string) => string;
  contactTimeListClassName?:string;
}

const ContactTimeSidebar: React.FC<IContactTimeSidebar> = (props) => {
  const {
    className,
    address,
    googleAddress,
    salesPhone,
    servicePhone,
    partsPhone,
    salesData,
    serviceData,
    contact = 'Sales:',
    service = 'Service:',
    partsData,
    collisionData,
    classNameAddress,
    contactClassName,
    parts = 'Parts:',
    financeDetails,
    salesPhoneTitle,
    servicePhoneTitle,
    collisionPhone,
    collision,
    lastServiceAccepted,
    lubeLaneData,
    showContactEmail = false,
    salesNote,
    secondarySalesPhone,
    secondaryServicePhone,
    secondaryPartsPhone,
    isAccordion = false,
    defaultOpenSales = false,
    defaultOpenService = false,
    defaultOpenParts = false,
    defaultOpenFinance = false,
    defaultOpenLastService = false,
    defaultOpenLubeLane = false,
    accordionClassName,
    accordionContentClassName,
    accordionTitleClassName,
    accordionActiveClassName,
    contactUsTitle = 'Contact us',
    showText = false,
    showAddress = true,
    topTitle,
    contactTimeListClassName,
    t,
  } = props;
  const classNames = getExtraClasses(styles, className);
  const addressClassName = getExtraClasses(styles, classNameAddress);
  const extraClasses = getExtraClasses(styles, contactClassName);
  const timeListExtraClasses = getExtraClasses(styles, contactTimeListClassName)
  useCallRail();
  return (
    <aside className={cn(classNames, styles.contact_time_sidebar)}>
      {topTitle && <h4>{topTitle}</h4>}
      <h3 className={styles.title}>{contactUsTitle}</h3>
      {showAddress && (
        <address className={cn(addressClassName, styles.address)}>
          <a href={googleAddress} target='_blank' rel='noopener noreferrer' data-events='getDirections'>
            <span>{address}</span>
          </a>
        </address>
      )}
      {showContactEmail && (
        <div className={styles.Contact_Email_Group}>
          <div className={styles.Contact_Email_Item}>
            {' '}
            <span className={styles.Contact_Email_Title}>Main</span>
            <a className={styles.Contact_Email_Link} href={`tel:${secondarySalesPhone}`}>
              {secondarySalesPhone}
            </a>
            <div className={styles.Contact_Email_Item}>
              <a
                href='mailto:sales@tubmanchev.com'
                className={styles.Contact_Email_Link}
                target='_blank'
                rel='noreferrer'
              >
                sales@tubmanchev.com
              </a>
            </div>
          </div>
          <div className={styles.Contact_Email_Item}>
            <span className={styles.Contact_Email_Title}>Service</span>{' '}
            <a
              className={styles.Contact_Email_Link}
              data-fda-category='clickToCall'
              data-fda-label='Main'
              href={`tel:${secondaryServicePhone}`}
              data-loc='contact-item'
            >
              {secondaryServicePhone}
            </a>
            <div className={styles.Contact_Email_Item}>
              <a
                href='mailto:service@tubmanchev.com'
                className={styles.Contact_Email_Link}
                target='_blank'
                rel='noreferrer'
              >
                service@tubmanchev.com
              </a>
            </div>
          </div>
          <div className={styles.Contact_Email_Item}>
            <span className={styles.Contact_Email_Title}>Parts</span>{' '}
            <a
              className={styles.Contact_Email_Link}
              data-fda-category='clickToCall'
              data-fda-label='Main'
              href={`tel:${secondaryPartsPhone}`}
              data-loc='contact-item'
            >
              {secondaryPartsPhone}
            </a>
            <div className={styles.Contact_Email_Item}>
              <a
                href='mailto:parts@tubmanchev.com'
                className={styles.Contact_Email_Link}
                target='_blank'
                rel='noreferrer'
              >
                parts@tubmanchev.com
              </a>
            </div>
          </div>
        </div>
      )}
      {!!salesPhoneTitle && <p>{salesPhoneTitle}</p>}
      {!!salesPhone && (
        <p className={cn(styles.contact_number, extraClasses)}>
          <a
            data-fda-action='click/touch'
            data-events='clickToCall'
            data-vehicle-details=''
            data-click-to-call-department='Sales'
            href={`tel:${salesPhone}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <strong>{contact}</strong> <span> {salesPhone}</span>
          </a>
        </p>
      )}
      {!!servicePhoneTitle && <p>{servicePhoneTitle}</p>}
      {!!servicePhone && (
        <p className={cn(styles.contact_number, extraClasses)}>
          <a
            data-fda-action='click/touch'
            data-events='clickToCall'
            data-vehicle-details=''
            data-click-to-call-department='Service'
            href={`tel:${servicePhone}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <strong>{service}</strong>
            <span> {servicePhone} </span>
          </a>
        </p>
      )}
      {!!partsPhone && (
        <p className={cn(styles.contact_number, extraClasses)}>
          <a
            data-fda-action='click/touch'
            data-events='clickToCall'
            data-vehicle-details=''
            data-click-to-call-department='Service'
            href={`tel:${partsPhone}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <strong>{parts}</strong>
            <span> {partsPhone} </span>
          </a>
        </p>
      )}
      {!!collisionPhone && (
        <p className={cn(styles.contact_number, extraClasses)}>
          <a
            data-fda-action='click/touch'
            data-events='clickToCall'
            data-vehicle-details=''
            data-click-to-call-department='Collision'
            href={`tel:${collisionPhone}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <strong>{collision}</strong> <span> {collisionPhone}</span>
          </a>
        </p>
      )}
      <ContactTimeList
        items={salesData}
        note={salesNote}
        isAccordion={isAccordion}
        defaultOpen={defaultOpenSales}
        accordionClassName={accordionClassName}
        accordionContentClassName={accordionContentClassName}
        accordionTitleClassName={accordionTitleClassName}
        accordionActiveClassName={accordionActiveClassName}
        className={timeListExtraClasses}
        t={t}
      />
      {showText && (
        <p className='text_Center'>
          <small>
            <i>*All hours subject to change</i>
          </small>
        </p>
      )}
      <ContactTimeList
        items={serviceData}
        isAccordion={isAccordion}
        defaultOpen={defaultOpenService}
        accordionClassName={accordionClassName}
        accordionContentClassName={accordionContentClassName}
        accordionTitleClassName={accordionTitleClassName}
        accordionActiveClassName={accordionActiveClassName}
        className={timeListExtraClasses}
        t={t}
      />
      {showText && (
        <p className='text_Center'>
          <small>
            <i>*All hours subject to change</i>
          </small>
        </p>
      )}
      {partsData && (
        <ContactTimeList
          items={partsData}
          isAccordion={isAccordion}
          defaultOpen={defaultOpenParts}
          accordionClassName={accordionClassName}
          accordionContentClassName={accordionContentClassName}
          accordionTitleClassName={accordionTitleClassName}
          accordionActiveClassName={accordionActiveClassName}
          className={timeListExtraClasses}
          t={t}
        />
      )}
      {showText && (
        <p className='text_Center'>
          <small>
            <i>*All hours subject to change</i>
          </small>
        </p>
      )}
      {collisionData && (
        <ContactTimeList
          items={collisionData}
          isAccordion={isAccordion}
          defaultOpen={defaultOpenParts}
          accordionClassName={accordionClassName}
          accordionContentClassName={accordionContentClassName}
          accordionTitleClassName={accordionTitleClassName}
          accordionActiveClassName={accordionActiveClassName}
          className={timeListExtraClasses}
          t={t}
        />
      )}
      {financeDetails && (
        <ContactTimeList
          items={financeDetails}
          isAccordion={isAccordion}
          defaultOpen={defaultOpenFinance}
          accordionClassName={accordionClassName}
          accordionContentClassName={accordionContentClassName}
          accordionTitleClassName={accordionTitleClassName}
          accordionActiveClassName={accordionActiveClassName}
          className={timeListExtraClasses}
          t={t}
        />
      )}
      {lastServiceAccepted && (
        <ContactTimeList
          items={lastServiceAccepted}
          isAccordion={isAccordion}
          defaultOpen={defaultOpenLastService}
          accordionClassName={accordionClassName}
          accordionContentClassName={accordionContentClassName}
          accordionTitleClassName={accordionTitleClassName}
          accordionActiveClassName={accordionActiveClassName}
          className={timeListExtraClasses}
          t={t}
        />
      )}
      {lubeLaneData && (
        <ContactTimeList
          items={lubeLaneData}
          isAccordion={isAccordion}
          defaultOpen={defaultOpenLubeLane}
          accordionClassName={accordionClassName}
          accordionContentClassName={accordionContentClassName}
          accordionTitleClassName={accordionTitleClassName}
          accordionActiveClassName={accordionActiveClassName}
          className={timeListExtraClasses}
          t={t}
        />
      )}
    </aside>
  );
};

export { ContactTimeSidebar };
