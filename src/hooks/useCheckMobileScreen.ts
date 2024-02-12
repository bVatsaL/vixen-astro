import { useEffect, useState } from "react";

export function useCheckMobileScreen() {
    const isSsr = typeof window === 'undefined';
    const [width, setWidth] = useState(isSsr ? 1024 : window?.innerWidth);
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };
    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      };
    }, []);
    return width <= 768;
  }