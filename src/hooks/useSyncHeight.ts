// https://dev.to/9zemian5/sync-height-between-elements-in-react-1fg0

import { MutableRefObject, useLayoutEffect } from 'react';

type Target = MutableRefObject<HTMLElement | null>;

// Store all elements per key, so it is easy to retrieve them
const store: Record<string, Target[]> = {};

// Triggered when useLayoutEffect is executed on any of the components that use useSyncRefHeight hook
const handleResize = (key: string) => {
  // get all elements with the same key
  const elements = store[key];
  if (elements) {
    let max = 0;
    // find the element with highest clientHeight value
    elements.forEach((element) => {
      if (element.current && element.current.clientHeight > max) {
        max = element.current.clientHeight;
      }
    });
    // update height of all 'joined' elements
    elements.forEach((element) => {
      if (element.current) {
        element.current.style.minHeight = `${max}px`;
      }
    });
  }
};

// Add element to the store when component is mounted and return cleanup function
const add = (key: string, element: Target) => {
  // create store if missing
  if (!store[key]) {
    store[key] = [];
  }

  store[key].push(element);

  // cleanup function
  return () => {
    const index = store[key].indexOf(element);
    if (index > -1) {
      store[key].splice(index, 1);
    }
  };
};

// Receives multiple elements ([key, element] pairs). This way one hook can be used to handle multiple elements
export type UseSyncRefHeightProps = Array<[string, Target]>;
export const useSyncRefHeight = (refs: UseSyncRefHeightProps, deps?: any[]) => {
  useLayoutEffect(() => {
    // store cleanup functions for each entry
    const cleanups: (() => void)[] = [];
    refs.forEach(([key, element]) => {
      // add element ref to store
      cleanups.push(add(key, element));
    });
    return () => {
      // cleanup when component is destroyed
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  useLayoutEffect(() => {
    // when any of the dependencies changes, update all elements heights
    refs.forEach(([key]) => {
      handleResize(key);
    });
  }, deps);
};
