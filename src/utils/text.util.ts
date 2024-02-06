export const typeWord = function* TypeWord(word: string) {
  const wordLength = word.length;
  let direction = 1;
  if (direction > 0) {
    for (let i = 0; i <= wordLength; i += 1) {
      yield word.substring(0, i);
    }
    direction = -1;
  }
  if (direction < 0) {
    for (let i = wordLength; i >= 0; i -= 1) {
      yield word.substring(0, i);
    }
    direction = -1;
  }
};

export const hash = (str: string) => {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    h = (h << 5) - h + char;
    h &= h; // Convert to 32bit integer
  }
  return new Uint32Array([h])[0].toString(36);
};

export const unescapeHTML = (text: string) => {
  try {
    const result = text?.replace?.(/&#[0-9]+;/g, (entity) => {
      const code = parseInt(entity.substring(2, entity.length - 1), 10);
      return String.fromCharCode(code);
    });
    return JSON?.parse?.(result) ?? '';
  } catch {
    return JSON?.parse?.(text) ?? '';
  }
};
