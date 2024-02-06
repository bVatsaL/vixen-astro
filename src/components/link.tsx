import { Link as ReactLink, useParams } from '@reactpwa/core';
// import { LinkProps } from 'react-router-dom';
import { type FC, useMemo } from 'react';
import { withLang } from '@utils/language.util';
import { useRecoilValue } from 'recoil-ssr';
import { siteUrlsAtom } from '@atoms/site.atom';

export const Link: FC<React.RefAttributes<HTMLAnchorElement> & { removeHttps?: boolean }> = ({
  to,
  removeHttps = true,
  children,
  target = '',
  ...otherProps
}) => {
  const { lang } = useParams();
  const siteUrls = useRecoilValue(siteUrlsAtom);
  // const redirect301Data = useRecoilValue(redirect301DataAtom);
  const finalTo = useMemo(() => {
    let tempTo = to;
    if (typeof tempTo === 'string') {
      for (let i = 0; i < siteUrls.length; i += 1) {
        tempTo = tempTo.replace(siteUrls[i], '');
      }
      tempTo = withLang(tempTo, lang);
    } else if (typeof tempTo !== 'string' && tempTo?.pathname) {
      tempTo.pathname = withLang(tempTo.pathname, lang);
    }
    // if (typeof redirect301Data === 'object' && typeof tempTo === 'string') {
    //   for (const key in redirect301Data) {
    //     if (key === tempTo || `${key}/` === tempTo){
    //       tempTo = redirect301Data[key];
    //     }
    //   }
    // }
    return tempTo;
  }, [to, lang]);

  if (typeof finalTo === 'string' && finalTo.startsWith('http')) {
    return (
      <a href={finalTo} target={target ?? '_blank'} rel='noopener noreferrer' {...otherProps}>
        {children}
      </a>
    );
  }

  return (
    <ReactLink to={removeHttps ? finalTo : to} target={target ?? '_self'} {...otherProps}>
      {children}
    </ReactLink>
  );
};
