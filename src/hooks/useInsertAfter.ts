import { useEffect } from 'react';

const insertAfter = (newNode: any, existingNode: any) => {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
};
export function useInsertAfter(
  newNode: string,
  existingNodeMaxWidth: string,
  existingNodeMinWidth: string,
  windowMaxWidth: number,
  windowMinWidth: number,
  dependencies = [] as any[],
) {
  useEffect(() => {
    const newNodeEl = document.querySelector<HTMLDivElement>(newNode);
    const existingNodeMaxWidthEl = document.querySelector<HTMLDivElement>(existingNodeMaxWidth);
    const existingNodeMinWidthEl = document.querySelector<HTMLDivElement>(existingNodeMinWidth);
    const insertElement = () => {
      if (window.innerWidth < windowMaxWidth) {
        insertAfter(newNodeEl, existingNodeMaxWidthEl);
      }
      if (window.innerWidth > windowMinWidth) {
        insertAfter(newNodeEl, existingNodeMinWidthEl);
      }
    };
    insertElement();
    window.addEventListener('resize', insertElement, { passive: true });

    return () => {
      window.removeEventListener('resize', insertElement);
    };
  }, [...dependencies, newNode, existingNodeMaxWidth, existingNodeMinWidth, windowMaxWidth, windowMinWidth]);
}
