import { useEffect } from 'react';

export function useMaxHeight(itemClass: string, dependencies = [] as any[]) {
  useEffect(() => {
    // Get max height
    const resizeHeight = () => {
      let maxHeight = 0;
      const elements = Array.from(document.querySelectorAll<HTMLDivElement>(itemClass));
      elements.forEach((el) => {
        const divHeight = el.getBoundingClientRect().height;
        if (divHeight > maxHeight) {
          maxHeight = divHeight;
        }
      });
      elements.forEach((el) => {
        el.style.height = `${maxHeight}px`;
      });
    };
    resizeHeight();
    window.addEventListener('resize', resizeHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeHeight);
    };
  }, [...dependencies, itemClass]);
}
