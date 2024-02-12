import { isValidVin } from '@components/compare-vehicles';
import { useLocation } from '@reactpwa/core';
import { ThirdPartyScript } from '@typedefs/scripts';
import { extractAsReactElements } from '@utils/server-scripts.util';
import { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';

const addMeta = (
  loadedScriptsRef: MutableRefObject<(HTMLScriptElement | HTMLMetaElement)[]>,
  metaElement: ReactElement,
) => {
  const meta = document.createElement('meta');

  Object.entries(metaElement.props).forEach(([key, value]) => {
    if (key !== 'children') {
      // @ts-ignore
      meta[key] = value;
    }
  });

  document.head.appendChild(meta);
  loadedScriptsRef.current.push(meta);
};

const loadScript = (
  loadedScriptsRef: MutableRefObject<(HTMLScriptElement | HTMLMetaElement)[]>,
  scriptElement: ReactElement,
) => {
  if (scriptElement.props?.src) {
    const script = document.createElement('script');
    Object.entries(scriptElement.props).forEach(([key, value]) => {
      if (key !== 'children') {
        // @ts-ignore
        script[key] = value;
      }
    });
    script.onload = () => {
      if (script.src.indexOf('askava') !== -1) {
        // @ts-ignore
        if (typeof window?.askAva?.__load === 'function') {
          // @ts-ignore
          askAva.__load();
        }
      }
    };
    document.head.appendChild(script);
    loadedScriptsRef.current.push(script);
  }
};

const loadFooterScript = (
  loadedScriptsRef: MutableRefObject<(HTMLScriptElement | HTMLMetaElement)[]>,
  scriptElement: ReactElement,
) => {
  if (scriptElement.props?.src) {
    const script = document.createElement('script');
    Object.entries(scriptElement.props).forEach(([key, value]) => {
      if (key !== 'children') {
        // @ts-ignore
          script.setAttribute(key, value)       
      }
    });
    script.onload = () => {
      if (script.src.indexOf('les_video') !== -1) {
        // @ts-ignore
        if (typeof window.int_les_vid === 'function') {
          window.int_les_vid();
        }
      }
    };
    document.body.appendChild(script);
    loadedScriptsRef.current.push(script);
  }
};

export function useThirdPartyScripts(endpoint?: string) {
  const location = useLocation();
  const [thirdPartyScripts, setThirdPartyScripts] = useState({
    headerScripts: [] as ThirdPartyScript[],
    footerScripts: [] as ThirdPartyScript[],
  });
  useEffect(() => {
    (async () => {
      if (endpoint) {
        const serverScripts = await (() => import('@utils/server-scripts.util'))();
        const { getScripts } = serverScripts;
        const scripts = await getScripts(endpoint);
        setThirdPartyScripts(scripts);
      }
    })();
  }, []);

  const loadedScripts = useRef([] as (HTMLScriptElement | HTMLMetaElement)[]);

  const removeOldScripts = () => {
    loadedScripts.current.forEach((s) => {
      s.remove();
    });
    loadedScripts.current = [];
  };

  const addPageScripts = (loc: typeof location) => {
    if (loc.pathname === '/') {
      // Home page
      thirdPartyScripts.headerScripts
        .filter((s) => s.page === 'homepage')
        .forEach((s) => {
          const reactElements = extractAsReactElements(s.elements);
          reactElements.filter((t) => t.type === 'script').forEach((t) => loadScript(loadedScripts, t));
          reactElements.filter((t) => t.type === 'meta').forEach((t) => addMeta(loadedScripts, t));
        });
      thirdPartyScripts.footerScripts
        .filter((s) => s.page === 'homepage')
        .forEach((s) => {
          const reactElements = extractAsReactElements(s.elements);
          reactElements
            .filter((t) => t.type === 'script')
            .forEach((t) => {
              loadFooterScript(loadedScripts, t);
            });
        });
    }
    if (loc.pathname?.startsWith('/inventory')) {
      const pathSplit = loc?.pathname?.split('/')?.filter(Boolean);
      const slug = pathSplit?.[pathSplit.length - 1];
      const slugParts = (slug ?? '').split('-');
      const vin = slugParts[slugParts.length - 1];
      if (!isValidVin(vin)) {
        // SRP page
        thirdPartyScripts.headerScripts
          .filter((s) => s.page === 'srp')
          .forEach((s) => {
            const reactElements = extractAsReactElements(s.elements);
            reactElements.filter((t) => t.type === 'script').forEach((t) => loadScript(loadedScripts, t));
            reactElements.filter((t) => t.type === 'meta').forEach((t) => addMeta(loadedScripts, t));
          });
        thirdPartyScripts.footerScripts
          .filter((s) => s.page === 'srp')
          .forEach((s) => {
            const reactElements = extractAsReactElements(s.elements);
            reactElements.filter((t) => t.type === 'script').forEach((t) => loadFooterScript(loadedScripts, t));
          });
      }
      if (isValidVin(vin)) {
        // VDP page
        thirdPartyScripts.headerScripts
          .filter((s) => s.page === 'vdp')
          .forEach((s) => {
            const reactElements = extractAsReactElements(s.elements);
            reactElements.filter((t) => t.type === 'script').forEach((t) => loadScript(loadedScripts, t));
            reactElements.filter((t) => t.type === 'meta').forEach((t) => addMeta(loadedScripts, t));
          });
        thirdPartyScripts.footerScripts
          .filter((s) => s.page === 'vdp')
          .forEach((s) => {
            const reactElements = extractAsReactElements(s.elements);
            reactElements.filter((t) => t.type === 'script').forEach((t) => loadFooterScript(loadedScripts, t));
          });
      }
    }
  };

  useEffect(() => {
    // let timeout: ReturnType<typeof setTimeout>;
    // if (locationKey !== location.key) {
    // Unmount old scripts
    removeOldScripts();
    // mount new scripts
    const timeout = setTimeout(() => {
      addPageScripts(location);
    }, 500);
    // }
    return () => {
      removeOldScripts();
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [thirdPartyScripts, location.key]);
}
