import { expectedSiteOriginAtom } from '@atoms/site.atom';
import { loadCallRailScripts } from '@utils/call-rail.util';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil-ssr';

function useCallRail() {
  const expectedSiteOrigin = useRecoilValue(expectedSiteOriginAtom);
  useEffect(() => {
    loadCallRailScripts(expectedSiteOrigin);
  });
}

export { useCallRail };
