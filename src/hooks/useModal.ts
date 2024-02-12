import { activeModalsAtom, registeredModalsAtom } from 'src/stores/modal.atom';
import { trackAscEvent } from '@utils/analytics.util';
import { useRecoilState, useRecoilValue } from 'recoil-ssr';

function useModals() {
  const [activeModals, setActiveModals] = useRecoilState(activeModalsAtom);
  const registeredModals = useRecoilValue(registeredModalsAtom);
  const openModal = (id: string, props: Record<string, any> = {}) => {
    if (!registeredModals.has(id)) {
      console.error('Modal should be registerd before opening.');
      return;
    }
    const newActiveModals = new Map(activeModals);
    newActiveModals.set(id, { state: 'open', props });
    setActiveModals(newActiveModals);
  };

  const closeModal = (id: string) => {
    if (id.includes('QUICK_VIEW_VDP_MODAL')) {
      trackAscEvent(`asc_media_interaction_${Date.now()}`, {
        creative_name: '',
        event: 'asc_media_interaction',
        event_action_result: 'close',
        link_url: window?.location?.href ?? '',
        media_type: '',
        page_type: window?.asc_datalayer?.page_type ?? 'custom',
      });
    }
    const newActiveModals = new Map(activeModals);
    const activeModal = newActiveModals.get(id);
    if (activeModal) {
      newActiveModals.set(id, { state: 'close', props: activeModal.props });
      setActiveModals(newActiveModals);
    }

    setTimeout(() => {
      const newActiveModals2 = new Map(activeModals);
      newActiveModals2.delete(id);
      setActiveModals(newActiveModals2);
    }, 200);
  };
  return [openModal, closeModal];
}

export { useModals };
