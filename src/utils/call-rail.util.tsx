import { cloneElement } from 'react';
import { loadScript } from './scripts.util';
import { hash } from './text.util';
import { decode } from './base64.util';
import { extractAsReactElements } from './server-scripts.util';

const callRailScriptMap: Record<string, string> = {};

export const loadCallRailScripts = async (_expectedSiteOrigin: string) => {
  let config: SiteConfig | undefined = undefined;
  if (typeof window !== 'undefined' && window.siteConfig) {
    config = window.siteConfig;
  }
  if (!config) {
    return;
  }

  const disableThirdParty = window?.location?.search.indexOf('disableThirdParty') !== -1;
  if (disableThirdParty) {
    return null;
  }
  if (!config.options?.callrailCode) {
    return null;
  }
  if (!callRailScriptMap[config.options.callrailCode]) {
    const decoded = decode(config.options.callrailCode);
    if (!decoded) return null;

    const element = extractAsReactElements(decoded)?.[0];
    if (!element) {
      return null;
    }

    if (!element.props.src) {
      return null;
    }
    const src = element.props.src.startsWith('//') ? `https:${element.props.src}` : element.props.src;
    callRailScriptMap[config.options.callrailCode] = src;
  }
  try {
    await loadScript(callRailScriptMap[config.options.callrailCode]);
    // @ts-ignore
    window?.CallTrk?.swap?.();
  } catch (_ex) {
    // Do nothing in case of error
    
  }
};

export const callRailHeadScript = (callRailScript?: string) => {
  if (!callRailScript) return null;
  try {
    const decoded = decode(callRailScript);
    if (!decoded) return null;

    const element = extractAsReactElements(decoded)?.[0];
    if (!element) {
      return null;
    }
    if (!element.props.src) {
      return null;
    }
    const src = element.props.src.startsWith('//') ? `https:${element.props.src}` : element.props.src;
    const key = hash(element.props.src);
    const ele = cloneElement(element, { src, key });
    return ele;
  } catch (ex) {
    // Do nothing
    console.log(ex);
  }
  return null;
};
