import { type TimeData } from '@atoms/settings.atom';
import { getExtraClasses } from '@utils/common.util';
import styles from './styles.module.scss';
import { Accordion } from '@components/accordion';
import cn from 'classnames';

interface IContactTimeList {
  className?: string;
  items?: TimeData;
  note?: string;
  isAccordion?: boolean;
  defaultOpen?: boolean;
  accordionClassName?: string;
  accordionContentClassName?: string;
  accordionTitleClassName?: string;
  accordionActiveClassName?: string;
  uppercaseString?: boolean;
  t?: (key?: string) => string;
}

const ContactTimeList: React.FC<IContactTimeList> = (props) => {
  const {
    items,
    className,
    note,
    isAccordion = false,
    defaultOpen = false,
    accordionClassName,
    accordionContentClassName,
    accordionTitleClassName,
    accordionActiveClassName,
    uppercaseString = false,
    t,
  } = props;
  const extraClasses = getExtraClasses(styles, className);
  return (
    <>
      {isAccordion ? (
        <Accordion
          title={items?.title}
          defaultOpenState={defaultOpen}
          className={accordionClassName}
          contentClassName={accordionContentClassName}
          titleClassName={accordionTitleClassName}
          activeClassName={accordionActiveClassName}
        >
          <ul className={styles.day_time_list}>
            {items?.data?.map((d) => (
              <li key={d?.day} className={styles.single_day_time}>
                <strong>{d?.day}</strong> <span dangerouslySetInnerHTML={{ __html: d?.time ?? '' }} />
              </li>
            ))}
          </ul>
          {!!note && <p className='my_1'>{note}</p>}
        </Accordion>
      ) : (
        <div className={extraClasses}>
          {!!items?.title && (
            <h3 className={cn(styles.title, { [styles.capital_String]: uppercaseString })}>{items.title}</h3>
          )}
          <ul className={styles.day_time_list}>
            {items?.data?.map((d) => (
              <li key={t?.(d?.day ?? '') ?? d?.day} className={styles.single_day_time}>
                <strong>{t?.(d?.day ?? '') ?? d?.day}</strong>{' '}
                <span dangerouslySetInnerHTML={{ __html: d?.time ?? '' }} />
              </li>
            ))}
          </ul>
          {!!note && <p className='my_1'>{note}</p>}
        </div>
      )}
    </>
  );
};

export { ContactTimeList };
