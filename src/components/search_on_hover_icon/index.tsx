import cn from 'classnames';
import { getExtraClasses } from '@utils/common.util';
import { SearchBar } from '@components/search-bar';
import styles from './styles.module.scss';

interface ISearchOnHoverIcon {
  className?: string;
  onSearch?: (value: string) => void;
  placeholders?: { display_name: string; item: string }[];
  autotype?: string[];
  placeholder?: string;
  handleModalSearch?: any;
  // position?: string;
  searchlabel?: string;
}

const SearchOnHoverIcon: React.FC<ISearchOnHoverIcon> = (props: any) => {
  const {
    className,
    onSearch,
    placeholder,
    placeholders,
    autotype,
    handleModalSearch,
    searchlabel,
    // position
  } = props;
  const extraClasses = getExtraClasses(styles, className);
  return (
    <div className={cn(styles.search_On_Hover_Contain, extraClasses)}>
      <span className={styles.icon}>
        <p>{searchlabel}</p>
        <i className='foxicon foxicon-search' />
      </span>
      <SearchBar
        className={cn(styles.search_Bar, 'icon_btn_only')}
        onSearch={onSearch}
        placeholder={placeholder}
        autotype={autotype}
        placeholders={placeholders}
        handleModalSearch={handleModalSearch}
      />
    </div>
  );
};

export { SearchOnHoverIcon };
