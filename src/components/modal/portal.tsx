import { activeModalsAtom, registeredModalsAtom } from '@atoms/modal.atom';
import { resumeBodyScroll, stopBodyScroll } from '@utils/modal.util';
import { cloneElement, type FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil-ssr';
import Modal from '.';

export const ModalPortal: FC = () => {
  const activeModals = useRecoilValue(activeModalsAtom);
  const registeredModals = useRecoilValue(registeredModalsAtom);
  const { pathname } = useLocation();

  const isAnyModalOpen = activeModals.size;

  useEffect(() => {
    resumeBodyScroll();
  }, [pathname]);

  useEffect(() => {
    if (isAnyModalOpen) {
      stopBodyScroll();
    }
    return () => {
      resumeBodyScroll();
    };
  }, [isAnyModalOpen]);

  if (!activeModals.size) {
    return null;
  }
  return (
    <>
      {Array.from(activeModals.entries()).map(([id, props]) => {
        const registerdModal = registeredModals.get(id);
        if (!registerdModal) {
          return null;
        }
        const children = cloneElement(registerdModal.children, props.props);
        return (
          <Modal
            key={id}
            id={id}
            className={children?.props?.modalClass}
            zIndexOverlay={children?.props?.zIndexOverlay}
            overlayClass={children?.props?.overlayClass}
          >
            {children}
          </Modal>
        );
      })}
    </>
  );
};
