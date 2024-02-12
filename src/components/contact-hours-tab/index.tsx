import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import React, { type MouseEventHandler, useEffect, useState } from 'react';
import TabNavItem from '@components/tab/tabs/tab-nav-item';
import TabContent from '@components/tab/tabs/tab-content';
import { trackGetDirections } from '@utils/analytics.util';
import {
  addressAtom,
  googleAddressUrlAtom,
  locationPhoneTitleAtom,
  primaryPhoneAtom,
  secondaryPhoneAtom,
  tertiaryPhoneAtom,
} from 'src/stores/location.atom';
import { useRecoilValue } from 'recoil-ssr';
import { Link } from '@components/link';
import { ContactTimeList } from '@components/contact-timing-sidebar/contact-timings';
import { hoursTitlesAtom, partsDataAtom, salesDataAtom, servicesDataAtom } from 'src/stores/settings.atom';
import styles from './style.module.scss';

interface IContactHourstab {
  className?: string;
  showHours?: boolean;
  tabclassName?: string;
}

const tubmanchevHolidayData = {
  title: '',
  data: [
    { day: 'Family Day', time: 'Monday, February 20' },
    { day: 'Good Friday', time: 'April 7' },
    { day: 'Victoria Day', time: 'Monday, May 22' },
    { day: 'Canada Day', time: 'Saturday, July 1' },
    { day: 'Civic Day', time: 'Monday, August 7' },
    { day: 'Labour Day', time: 'Monday, September 4' },
    { day: 'Thanksgiving', time: 'Monday, October 9' },
    { day: 'Remembrance Day', time: 'Sales Closed Until Noon Wednesday, November 11' },
    { day: 'Christmas Eve', time: 'Sunday, December 24' },
    { day: 'Christmas Day', time: 'Monday, December 25' },
    { day: 'Boxing Day', time: 'Tuesday, December 26' },
    { day: "New Year's Eve", time: 'Sunday, December 31' },
    { day: 'New Year’s Day', time: 'Monday, January 1' },
  ],
};

export const ContactHoursTab: React.FC<IContactHourstab> = ({ className, tabclassName, showHours = true }) => {
  const classNames = getExtraClasses(styles, className);
  const tabclassNames = getExtraClasses(styles, tabclassName);
  const [activeTab, setActiveTab] = useState([0] as number[]);
  const servicesData = useRecoilValue(servicesDataAtom);
  const partsData = useRecoilValue(partsDataAtom);
  const salesData = useRecoilValue(salesDataAtom);
  const primaryPhone = useRecoilValue(primaryPhoneAtom);
  const secondaryPhone = useRecoilValue(secondaryPhoneAtom);
  const tertiaryPhone = useRecoilValue(tertiaryPhoneAtom);
  const handleDirectionsClick: MouseEventHandler<HTMLAnchorElement> = () => {
    trackGetDirections();
  };
  const address = useRecoilValue(addressAtom);
  const googleAddressUrl = useRecoilValue(googleAddressUrlAtom);
  const locationPhoneTitles = useRecoilValue(locationPhoneTitleAtom);
  const hoursTitles = useRecoilValue(hoursTitlesAtom);
  const isSSr = typeof window === 'undefined';

  useEffect(() => {
    if (!isSSr) {
      if (window?.innerWidth < 880) {
        setActiveTab([-1]);
      }
    }
  }, [isSSr]);

  const handleTabClick = (id: number) => {
    if (window?.innerWidth < 880) {
      const index = activeTab.indexOf(id);
      if (index > -1) {
        activeTab.splice(index, 1);
        setActiveTab([...activeTab]);
      } else {
        setActiveTab([...activeTab, id]);
      }
    } else {
      setActiveTab([id]);
    }
  };
  return (
    <div className={cn(styles.contact_Hours_Tab, classNames)}>
      <div className={cn(styles.contactDetailsTab, tabclassNames)}>
        <TabNavItem
          title={<span>Contact Us</span>}
          id={0}
          activeTab={activeTab?.includes(0) ? 0 : undefined}
          handleTabClick={handleTabClick}
          setActiveTab={setActiveTab}
          className='contact-Hours-Tab'
          activeClassName={styles.active}
        />
        <TabNavItem
          title={
            <span>
              {showHours ? (
                <>
                  {hoursTitles?.hoursPriamryTitle ?? 'Sales'} <br /> Hours
                </>
              ) : (
                hoursTitles?.hoursPriamryTitle ?? 'Sales'
              )}
            </span>
          }
          id={1}
          activeTab={activeTab?.includes(1) ? 1 : undefined}
          handleTabClick={handleTabClick}
          setActiveTab={setActiveTab}
          className='contact-Hours-Tab'
          activeClassName={styles.active}
        />
        <TabNavItem
          title={
            <span>
              {showHours ? (
                <>
                  {hoursTitles?.hoursSecondaryTitle ?? 'Service'} <br /> Hours
                </>
              ) : (
                hoursTitles?.hoursSecondaryTitle ?? 'Sales'
              )}
            </span>
          }
          id={2}
          activeTab={activeTab?.includes(2) ? 2 : undefined}
          setActiveTab={setActiveTab}
          handleTabClick={handleTabClick}
          className='contact-Hours-Tab'
          activeClassName={styles.active}
        />
        <TabNavItem
          title={
            <span>
              {showHours ? (
                <>
                  {hoursTitles?.hoursTertiaryTitle ?? 'Parts'} <br /> Hours
                </>
              ) : (
                hoursTitles?.hoursTertiaryTitle ?? 'Sales'
              )}
            </span>
          }
          id={3}
          activeTab={activeTab?.includes(3) ? 3 : undefined}
          setActiveTab={setActiveTab}
          handleTabClick={handleTabClick}
          className='contact-Hours-Tab'
          activeClassName={styles.active}
        />
        <TabNavItem
          title={<span>Holiday Hours</span>}
          id={4}
          activeTab={activeTab?.includes(4) ? 4 : undefined}
          handleTabClick={handleTabClick}
          setActiveTab={setActiveTab}
          className='contact-Hours-Tab'
          activeClassName={styles.active}
        />
      </div>
      <div className={cn(styles.tabContent)}>
        <>
          <TabNavItem
            title={<span>Contact Us</span>}
            id={0}
            activeTab={activeTab?.includes(0) ? 0 : undefined}
            setActiveTab={setActiveTab}
            handleTabClick={handleTabClick}
            className={cn(styles.hide_In_Desktop, 'contact_Hours_Tab_Mobile')}
          />
          <TabContent className='priceDetails' id={0} activeTab={activeTab?.includes(0) ? 0 : undefined}>
            <address style={{ marginBottom: '0.5rem', fontStyle: 'normal' }}>
              {' '}
              <a
                href={googleAddressUrl}
                target='_blank'
                rel='noopener noreferrer canonical'
                onClick={handleDirectionsClick}
                data-events='getDirections'
              >
                {address}
              </a>
            </address>
            {primaryPhone && (
              <p className={styles.sales_Info}>
                <span> {locationPhoneTitles?.primaryPhoneTitle ?? 'Main'} </span>
                <a href={`tel:${primaryPhone}`}>{primaryPhone}</a>
                <a href={`mailto:${locationPhoneTitles?.primaryEmail}`} target='_blank' rel='noreferrer'>
                  {locationPhoneTitles?.primaryEmail}
                </a>
              </p>
            )}
            {secondaryPhone && (
              <p className={styles.sales_Info}>
                <span> {locationPhoneTitles?.secondaryPhoneTitle ?? 'Service'} </span>
                <a href={`tel:${secondaryPhone}`}>{secondaryPhone}</a>
                <a href={`mailto:${locationPhoneTitles?.secondaryEmail}`} target='_blank' rel='noreferrer'>
                  {locationPhoneTitles?.secondaryEmail}
                </a>
              </p>
            )}
            {tertiaryPhone && (
              <p className={styles.sales_Info}>
                <span> {locationPhoneTitles?.tertiaryPhoneTitle ?? 'Parts'} </span>
                <a href={`tel:${tertiaryPhone}`}>{tertiaryPhone}</a>
                <a href={`mailto:${locationPhoneTitles?.tertiaryEmail}`} target='_blank' rel='noreferrer'>
                  {locationPhoneTitles?.tertiaryEmail}
                </a>
              </p>
            )}
            <p className='text_Align_Center mb_0'>
              <Link to='/contact-us'>Get More Info</Link>
            </p>
          </TabContent>
        </>
        <>
          <TabNavItem
            title={
              <span>
                {showHours ? (
                  <>
                    {hoursTitles?.hoursPriamryTitle ?? 'Sales'} <br /> Hours
                  </>
                ) : (
                  hoursTitles?.hoursPriamryTitle ?? 'Sales'
                )}
              </span>
            }
            id={1}
            activeTab={activeTab?.includes(1) ? 1 : undefined}
            setActiveTab={setActiveTab}
            handleTabClick={handleTabClick}
            className={cn(styles.hide_In_Desktop, 'contact_Hours_Tab_Mobile')}
          />
          <TabContent id={1} activeTab={activeTab?.includes(1) ? 1 : undefined}>
            <ContactTimeList className={styles.contact_Time_List} items={salesData} />
            <p className={cn(styles.contact_Time_List, 'text_Align_Center mb_1 mt_0_5')}>
              Sales available after hours by appointment
            </p>
          </TabContent>
        </>
        <>
          <TabNavItem
            title={
              <span>
                {showHours ? (
                  <>
                    {hoursTitles?.hoursSecondaryTitle ?? 'Service'} <br /> Hours
                  </>
                ) : (
                  hoursTitles?.hoursSecondaryTitle ?? 'Sales'
                )}
              </span>
            }
            id={2}
            activeTab={activeTab?.includes(2) ? 2 : undefined}
            setActiveTab={setActiveTab}
            handleTabClick={handleTabClick}
            className={cn(styles.hide_In_Desktop, 'contact_Hours_Tab_Mobile')}
          />
          <TabContent id={2} activeTab={activeTab?.includes(2) ? 2 : undefined}>
            <ContactTimeList className={styles.contact_Time_List} items={servicesData} />
          </TabContent>
        </>
        <>
          <TabNavItem
            title={
              <span>
                {showHours ? (
                  <>
                    {hoursTitles?.hoursTertiaryTitle ?? 'Parts'} <br /> Hours
                  </>
                ) : (
                  hoursTitles?.hoursTertiaryTitle ?? 'Sales'
                )}
              </span>
            }
            id={3}
            activeTab={activeTab?.includes(3) ? 3 : undefined}
            setActiveTab={setActiveTab}
            handleTabClick={handleTabClick}
            className={cn(styles.hide_In_Desktop, 'contact_Hours_Tab_Mobile')}
          />
          <TabContent id={3} activeTab={activeTab?.includes(3) ? 3 : undefined}>
            <ContactTimeList className={styles.contact_Time_List} items={partsData} />
          </TabContent>
        </>
        <>
          <TabNavItem
            title={<span>Holiday Hours</span>}
            id={4}
            activeTab={activeTab?.includes(4) ? 4 : undefined}
            setActiveTab={setActiveTab}
            handleTabClick={handleTabClick}
            className={cn(styles.hide_In_Desktop, 'contact_Hours_Tab_Mobile')}
          />
          <TabContent id={4} activeTab={activeTab?.includes(4) ? 4 : undefined}>
            <p className={cn(styles.contact_Time_List, 'text_Align_Center mb_1 mt_0_5')}>2023 Holidays - Closed on:</p>
            <ContactTimeList className={styles.contact_Time_List} items={tubmanchevHolidayData} />
          </TabContent>
        </>
      </div>
    </div>
  );
};
