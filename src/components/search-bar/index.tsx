import {
  type ChangeEventHandler,
  type FormEventHandler,
  type KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import cn from 'classnames';
import searchIcon from '@resources/svg-icons/search-ico-white.svg';
import { delay, getExtraClasses } from '@utils/common.util';
import { Button } from '@components/button';
import { useRecoilValue } from 'recoil-ssr';
import { addressAtom } from '@atoms/location.atom';
import { typeWord } from '@utils/text.util';
import { serial } from '@utils/promise.util';
import { Link } from '@components/link';
import Fuse from 'fuse.js';
import { getInventoryUrl } from '@utils/inventory.util';
import { useLocation, useNavigate, useParams } from '@reactpwa/core';
import { withLang } from '@utils/language.util';
import { trackAscEvent, trackGetDirections, trackTypedSearch } from '@utils/analytics.util';
import styles from './styles.module.scss';
import { isValidVin } from '@components/compare-vehicles';
import { searchRestrictByTypeAtom } from '@atoms/settings.atom';

interface ISearchBar {
  className?: string;
  placeholder?: string;
  isGetDirection?: boolean;
  onSearch?: (value: string) => void;
  icon?: string;
  getDirectionPlaceholder?: string;
  placeholders?: { display_name: string; item: string }[];
  autotype?: string[];
  handleModalSearch?: any;
  btnClassName?: string;
  inputClassName?: string;
  inputWrapperClassName?: string;
  showSearchIcon?: boolean;
  btnText?: string;
  showBtnIcon?: boolean;
}

export const SearchBar: React.FC<ISearchBar> = (props) => {
  const {
    className,
    placeholder,
    isGetDirection = false,
    onSearch,
    icon,
    placeholders,
    autotype,
    getDirectionPlaceholder,
    handleModalSearch,
    btnClassName,
    inputClassName,
    inputWrapperClassName,
    showSearchIcon = false,
    btnText = 'Search',
    showBtnIcon = true,
  } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const extraClasses = getExtraClasses(styles, className);
  const btnClasses = getExtraClasses(styles, btnClassName);
  const inputWrapperClasses = getExtraClasses(styles, inputWrapperClassName);
  const dealerAddress = useRecoilValue(addressAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();
  const searchRestrictByType = useRecoilValue(searchRestrictByTypeAtom);
  const currentPlaceHolderIndex = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const fuse = useMemo(
    () =>
      new Fuse(placeholders ?? [], {
        threshold: 0.3,
        keys: ['display_name'],
      }),
    [placeholders],
  );

  const [selectedAutocompleteListIndex, setSelectedAutocompleteListIndex] = useState(-1);
  const updateSelectedAutocompleteListIndex = (index: number) => () => setSelectedAutocompleteListIndex(index);
  const [autocompleteList, setAutocompleteList] = useState<{ display_name: string; item: string }[]>([]);
  const inputPlaceholder = autotype?.[currentPlaceHolderIndex.current] ?? placeholder ?? '';

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    startTransition(() => {
      setAutocompleteList(fuse.search(e.target.value).map((m) => m.item));
    });
  };

  let isCurrentInventoryUsed = false;
  let isCurrentInventoryNew = false;
  if (location.pathname?.startsWith('/inventory')) {
    const slugParts = (location.pathname ?? '').split('-');
    const vin = slugParts[slugParts.length - 1];
    isCurrentInventoryUsed =
      !isValidVin(vin) &&
      (`${location.pathname}${location.search}`?.indexOf('used') > -1 ||
        `${location.pathname}${location.search}`?.indexOf('Used') > -1);
    isCurrentInventoryNew =
      !isValidVin(vin) &&
      (`${location.pathname}${location.search}`?.indexOf('new') > -1 ||
        `${location.pathname}${location.search}`?.indexOf('New') > -1);
  }

  const defalutOnSearch = (searchValue: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append('s', searchValue.trim());
    const searchStr = searchParams.toString();
    let path = 'inventory';
    if (isCurrentInventoryUsed) {
      path = 'inventory/used';
    }
    if (isCurrentInventoryNew) {
      path = 'inventory/new';
    }
    if (searchRestrictByType && !isCurrentInventoryNew && !isCurrentInventoryUsed) {
      path = 'inventory/new';
    }
    const inventoryUrl = `/${path}/${searchStr ? `?${searchStr}` : ''}`;
    navigate(withLang(inventoryUrl, lang));
  };

  useEffect(() => {
    setSelectedAutocompleteListIndex(-1);
  }, [autocompleteList]);
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedAutocompleteListIndex((i) => {
          let newIndex = i + 1;
          if (newIndex >= autocompleteList.length) {
            newIndex = -1;
          }
          return newIndex;
        });
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedAutocompleteListIndex((i) => {
          let newIndex = i - 1;
          if (newIndex < -1) {
            newIndex = autocompleteList.length - 1;
          }
          return newIndex;
        });
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedAutocompleteListIndex !== -1) {
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          navigate(
            withLang(
              getInventoryUrl(
                new URLSearchParams({
                  type: isCurrentInventoryUsed ? 'used' : isCurrentInventoryNew ? 'new' : '',
                  model: autocompleteList[selectedAutocompleteListIndex].item,
                  ref: 'fromsearch',
                }),
              ),
              lang,
            ),
          );
        } else {
          const onSearchParams = new URLSearchParams();
          onSearchParams.append('s', inputRef.current?.value.trim() ?? '');
          if (isCurrentInventoryUsed) {
            onSearchParams.set('type', 'used');
          }
          if (isCurrentInventoryNew) {
            onSearchParams.set('type', 'new');
          }
          if (searchRestrictByType && !isCurrentInventoryNew && !isCurrentInventoryUsed) {
            onSearchParams.set('type', 'new');
          }
          const newSearchStr = onSearchParams.toString();
          const queryParams = newSearchStr ? `?${newSearchStr}` : '';
          const inventoryUrl = `/inventory/${queryParams}`;
          navigate(withLang(inventoryUrl, lang));
          formRef?.current?.reset();
        }
      }
    },
    [selectedAutocompleteListIndex, autocompleteList],
  );

  useEffect(() => {
    setAutocompleteList([]);
    setSelectedAutocompleteListIndex(-1);
  }, [location]);

  /**
   * Typing effect
   */
  useEffect(() => {
    let mounted = true;
    const autotypeList = autotype ?? [];
    const renderWords = async () => {
      if (!autotypeList.length || !mounted) {
        return;
      }
      await serial(
        autotypeList.map((pwrod) => async () => {
          const wordIt = typeWord(pwrod);
          const subWords = Array.from(wordIt);
          await serial(
            subWords.map((subWord) => async () => {
              if (!mounted) {
                return;
              }
              if (inputRef.current) {
                inputRef.current.placeholder = subWord;
              }
              if (subWord === pwrod) {
                await delay(300);
              } else {
                await delay(150);
              }
            }),
          );
        }),
      );
      await renderWords();
    };
    renderWords();
    return () => {
      mounted = false;
    };
  }, [autotype]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formValues = e.currentTarget;
    const formData = new FormData(formValues);
    const searchValue = (formData.get('search') || '') as string;
    if (isGetDirection) {
      const destinationAddress = encodeURIComponent(dealerAddress);
      const sourceAddress = encodeURIComponent(searchValue);
      trackGetDirections();
      window.open(`https://maps.google.com/maps?daddr=${destinationAddress}&saddr=${sourceAddress}`, '_blank');
      return;
    }
    trackTypedSearch({
      searchValue,
    });
    trackAscEvent(`asc_element_configuration_${Date.now()}`, {
      event_action: 'keyup',
      event: 'asc_element_configuration',
      page_type: window?.asc_datalayer?.page_type,
      element_text: 'query',
      element_type: 'search_bar',
      element_value: searchValue,
      product_name: 'Fox Dealer',
      element_subtype: 'field',
      element_title: null,
      element_state: null,
    });
    if (onSearch) {
      onSearch?.(searchValue);
    } else {
      defalutOnSearch?.(searchValue);
    }
    formRef?.current?.reset();
  };

  const trackEvent = () => {
    trackAscEvent(`asc_element_configuration_${Date.now()}`, {
      event_action: 'click',
      event: 'asc_element_configuration',
      page_type: window?.asc_datalayer?.page_type,
      element_text: 'search text',
      link_url: null,
      event_action_result: 'search',
      element_type: 'form',
    });
    handleModalSearch?.();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={cn(styles.searchbar_Contain, extraClasses)}>
      <div className={cn(styles.input_Wrapper, inputWrapperClasses)}>
        <input
          ref={inputRef}
          type='search'
          name='search'
          className={cn(styles.search_Input, inputClassName)}
          placeholder={isGetDirection ? getDirectionPlaceholder : inputPlaceholder}
          aria-label='Search'
          autoComplete='off'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={trackEvent}
        />
        {!!showSearchIcon && (
          <span className={styles.icon} onClick={handleModalSearch}>
            <i className='foxicon foxicon-search' />
          </span>
        )}
        {!!autocompleteList.length && (
          <div className={styles.autocomplete_Wrapper}>
            <ul>
              {autocompleteList.map((ac, index) => (
                <li key={ac.item}>
                  <Link
                    to={getInventoryUrl(
                      new URLSearchParams({
                        type: isCurrentInventoryUsed ? 'used' : 'new',
                        model: ac.item,
                        ref: 'fromsearch',
                      }),
                    )}
                    onMouseEnter={updateSelectedAutocompleteListIndex(index)}
                    className={cn(styles.autocomplete_Link, {
                      [styles.hovered]: selectedAutocompleteListIndex === index,
                    })}
                  >
                    {ac.display_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button type='submit' className={cn(styles.search_Btn, 'btn-icon btn-rounded btn-sm', btnClasses)}>
        {showBtnIcon && <img src={icon ?? searchIcon} alt='Search' />}
        <span>{btnText}</span>
      </Button>
    </form>
  );
};
