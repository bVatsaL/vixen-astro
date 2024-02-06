export const deepClone = (obj: object) => JSON.parse(JSON.stringify(obj));

/**
 * Get extraclassnames from combination of className added to the
 * component
 * @param styles
 * @param className
 */
export const getExtraClasses = (styles: any, className?: string) => {
  if (!className?.trim?.()) return '';
  const extraClasses = className
    .trim()
    .split(/\s/g)
    .filter((c) => !!c)
    .map((c) => {
      if (typeof styles[c] !== 'undefined') {
        return styles[c];
      }
      return c;
    })
    .join(' ');
  return extraClasses;
};

export const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const removeUndefined = <T>(obj: T) => {
  const clonedObj = deepClone(obj as object);
  Object.keys(clonedObj).forEach((key) => {
    if (clonedObj[key] === undefined) {
      delete clonedObj[key];
    }
  });
  return clonedObj as T;
};
