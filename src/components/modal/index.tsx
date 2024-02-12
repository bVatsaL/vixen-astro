import { useRef, type ReactElement, type MouseEventHandler, type BaseSyntheticEvent } from 'react';
import cn from 'classnames';

import { getExtraClasses } from '@utils/common.util';
// Components
import { Button } from '@components/button';
// Images
import Close from '@resources/svg-icons/close.svg';
import { useRecoilValue } from 'recoil-ssr';
import { activeModalsAtom } from 'src/stores/modal.atom';
import { useModals } from '@hooks/useModal';
import { lightBoxAtom } from 'src/stores/lightbox.atom';
import style from './styles.module.scss';
import { trackAscEvent } from '@utils/analytics.util';

/**
 * @todo Correct CSS ClassNames
 */
interface IModal {
  children?: ReactElement;
  className?: string;
  overlayClass?: string;
  contentClass?: string;
  isOpen?: boolean;
  zIndexOverlay?: number;
  zIndexModal?: number;
  title?: string;
  id: string;
}

const Modal: React.FC<IModal> = ({
  children,
  className = '',
  overlayClass = '',
  contentClass = '',
  zIndexOverlay,
  zIndexModal,
  title,
  id,
}) => {
  const modal = useRecoilValue(activeModalsAtom);
  const isLightBoxActive = useRecoilValue(lightBoxAtom);
  const isOpen = modal.get(id)?.state === 'open';
  const inlineStyles: any = {};
  if (zIndexOverlay) {
    inlineStyles.zIndex = zIndexOverlay;
  }
  if (zIndexModal) {
    inlineStyles.zIndex = zIndexModal;
  }
  const modalOverlayRef = useRef(null);
  const modalDialogRef = useRef(null);
  const extraClasses = getExtraClasses(style, className);
  const overlayClasses = getExtraClasses(style, overlayClass);
  const contentClasses = getExtraClasses(style, contentClass);
  const doNothing = () => {};
  const [, closeModal] = useModals();
  const closeCurrentModal: MouseEventHandler<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement> = () => {
    if (isLightBoxActive) return;
    closeModal(id);
  };

  const stopPropagation = (e: BaseSyntheticEvent) => {
    trackAscEvent(`asc_special_offer_${Date.now()}`, {
      page_type: window?.asc_datalayer?.page_type ?? 'custom',
      event: 'asc_special_offer',
      element_position: 'popup',
      flow_outcome: 'engage',
      department: id,
      promotion_name: id,
    });
    e?.stopPropagation?.();
  };
  return (
    <>
      <div
        tabIndex={-1}
        className={cn(style.overlay, overlayClasses, {
          [style.open]: isOpen,
        })}
        onKeyDown={doNothing}
        ref={modalOverlayRef}
        style={inlineStyles}
        onClick={closeCurrentModal}
      />
      <div
        tabIndex={-1}
        className={cn(style.modal, extraClasses, {
          [style.open]: isOpen,
        })}
        onKeyDown={doNothing}
        style={inlineStyles}
        id={id}
        onClick={closeCurrentModal}
      >
        <div className={style['modal-dialog']} ref={modalDialogRef} onClick={stopPropagation}>
          <div
            className={cn(style['modal-content'], {
              [contentClasses]: !!contentClasses,
            })}
          >
            {!!title && (
              <div className={style['modal-header']}>
                <h3 className={style['modal-title']}>{title}</h3>
              </div>
            )}
            <div className={style['modal-body']}>{children}</div>
            <Button className={cn(style.close_Btn, 'btn-link btn-width-32')} onClick={closeCurrentModal}>
              <i className='foxicon foxicon-cross' />
              <img src={Close} alt='Close' title='Close' />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
