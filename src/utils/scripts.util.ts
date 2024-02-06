import { hash } from './text.util';

const scriptStatusMap = new WeakMap();

export const loadScript = async (src: string, attributes?: Record<string, string>) => {
  const idHash = attributes?.id ?? hash(src);
  const externalScripts = scriptStatusMap.get(window) ?? {};
  if (externalScripts[idHash]) {
    
    return externalScripts[idHash];
  }

  if (document.querySelector(`script[data-id="${idHash}"]`)) {
    externalScripts[idHash] = true;
    scriptStatusMap.set(window, externalScripts);
    
    return true;
  }
  externalScripts[idHash] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('src', src);

    if (attributes) {
      const attKeys = Object.keys(attributes ?? {});
      for (let i = 0; i < attKeys.length; i += 1) {
        script.setAttribute(attKeys[i], attributes[attKeys[i]]);
      }
    }

    script.setAttribute('data-id', idHash);
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
  });
  scriptStatusMap.set(window, externalScripts);
  
  return externalScripts[idHash];
};
