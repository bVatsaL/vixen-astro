import { useEffect } from 'react';

const useEmplifiIperceptionsScript = (): void => {
  useEffect(() => {
    // @ts-ignore
    window.iperceptionskey = '6d1fdf1a-2979-42c3-82c9-6ae3384d9f05';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//universal.iperceptions.com/wrapper.js';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useEmplifiIperceptionsScript;
