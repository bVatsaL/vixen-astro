export const decode = (str: string) => {
  if (typeof Buffer === 'undefined' && typeof atob === 'function') {
    const value = str.replace('00', '=').replace('00', '=');
    return atob(value);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString();
  }
  return str;
};

export const encode = (str: string) => {
  if (typeof Buffer === 'undefined' && typeof btoa === 'function') {
    return btoa(str);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64');
  }
  return str;
};
