import { registeredModalsAtom } from 'src/stores/modal.atom';
import { type FC, memo, type ReactElement, useEffect } from 'react';
import { useSetRecoilState } from 'recoil-ssr';

export const RegisterModal: FC<{ id: string; children: ReactElement }> = memo(({ id, children }) => {
  const setRegisteredModals = useSetRecoilState(registeredModalsAtom);
  useEffect(() => {
    setRegisteredModals((registeredModals) => {
      const newRegisteredModals = new Map(registeredModals);
      const previouslyRegisteredCount = newRegisteredModals.get(id)?.count ?? 0;
      newRegisteredModals.set(id, {
        children,
        count: previouslyRegisteredCount + 1,
      });
      return newRegisteredModals;
    });
    return () => {
      setRegisteredModals((registeredModals) => {
        const newRegisteredModals2 = new Map(registeredModals);
        const previouslyRegistered = newRegisteredModals2.get(id);
        const previouslyRegisteredCount = previouslyRegistered?.count ?? 0;
        if (previouslyRegisteredCount - 1 <= 0) {
          newRegisteredModals2.delete(id);
        } else if (previouslyRegisteredCount && previouslyRegistered?.children) {
          newRegisteredModals2.set(id, {
            children: previouslyRegistered.children,
            count: previouslyRegisteredCount - 1,
          });
        }
        return newRegisteredModals2;
      });
    };
  }, []);
  return <></>;
});
