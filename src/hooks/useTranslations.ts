import { useData } from '@reactpwa/core';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getI18n } from '../i18n';

type Translations = Record<
  string,
  () => Promise<{
    default: Record<string, string>;
  }>
>;

export function useTranslations(key: string, translations: Translations) {
  const i18n = getI18n();
  const ns = `translations.${key}`.replace(/\./gi, '-');
  const lng = i18n.language;
  const translationToLoad = translations[lng];
  const data = useData(ns, async () => {
    if (i18n.hasResourceBundle(lng, ns)) {
      return { default: i18n.getResourceBundle(lng, ns) };
    }
    if (translationToLoad) {
      return translationToLoad();
    }
    return { default: {} };
  });
  if (!i18n.hasResourceBundle(lng, ns)) {
    const translationData = data.default ?? {};
    i18n.addResourceBundle(lng, ns, translationData, true, true);
  }

  useEffect(
    () => () => {
      i18n.removeResourceBundle(lng, ns);
    },
    [],
  );
  const [t] = useTranslation(ns);
  return [t] as [typeof t];
}
