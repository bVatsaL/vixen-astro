export const capitaliseString = (name: string) => {
  if (!name) {
    return '';
  }
  const str = name;
  const splitString = str.split('');
  const initialLetter = splitString?.[0]?.toUpperCase();
  const newString = [...initialLetter, ...splitString];
  newString?.splice(1, 1);
  return newString?.join('');
};
