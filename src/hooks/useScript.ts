import { useEffect } from 'react';

function useScript(addedScript: string) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = addedScript;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);
}

export default useScript;
