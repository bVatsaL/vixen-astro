type ScriptStatus = 'loading' | 'loaded' | 'error';

const scriptStatusMap: Record<string, ScriptStatus> = {};

export function loadScript(src: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (scriptStatusMap[src] === 'loaded') {
      resolve();
      return;
    }

    if (scriptStatusMap[src] === 'loading') {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        existingScript.addEventListener('load', () => {
          scriptStatusMap[src] = 'loaded';
          resolve();
        });

        existingScript.addEventListener('error', () => {
          scriptStatusMap[src] = 'error';
          reject(new Error(`Failed to load script: ${src}`));
        });
      }
      return;
    }

    scriptStatusMap[src] = 'loading';

    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.async = true;

    script.addEventListener('load', () => {
      setTimeout(() => {
        scriptStatusMap[src] = 'loaded';
        resolve();
      }, 100);
    });

    script.addEventListener('error', () => {
      scriptStatusMap[src] = 'error';
      reject(new Error(`Failed to load script: ${src}`));
    });

    document.head.appendChild(script);
  });
}