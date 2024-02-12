const ValidLanguages = ['en', 'es'];

export const getDefaultLanguage = () => ValidLanguages[0];

export const getLocale = (pathname: string) => {
  const lang = pathname.split('/').filter(Boolean).shift();
  if (lang && ValidLanguages.includes(lang)) {
    return lang;
  }
  return undefined;
};

export const hasValidLanguage = (pathname: string): boolean => !!getLocale(pathname);

const dummyBase = 'http://example.com';

export const withLang = (url: string, lang?: string) => {
  if (url.startsWith('http') || !lang) {
    return url;
  }
  if (!hasValidLanguage(url)) {
    const urlWithLang = new URL(url, dummyBase);
    urlWithLang.pathname = `/${lang}${urlWithLang.pathname}`;
    return urlWithLang.toString().replace(dummyBase, '');
  }
  return url;
};
