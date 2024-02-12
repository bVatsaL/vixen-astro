import { type FallbackProps} from 'react-error-boundary';
import { useCookies } from 'react-cookie';
import { type FC, useEffect } from 'react';

export const ErrorFallback: FC<FallbackProps> = ({ resetErrorBoundary }) => {
  const [cookies, setCookie] = useCookies(['internal_reload_count', 'allow_auto_reload']);
  const reloadCount = +(cookies.internal_reload_count ?? 0);
  const allowAutoReload = cookies.allow_auto_reload !== 'false';

  useEffect(() => {
    // console.info('RETRY:: reloadCount', reloadCount);
    if (reloadCount < 3) {
      setCookie('internal_reload_count', reloadCount + 1, {
        sameSite: 'lax',
      });
      // console.info('RETRY:: Internal Reload: ', reloadCount);
      resetErrorBoundary();
      // window.location.reload();
    } else {
      // console.info('RETRY:: Remove internal reload count cookie');
      setCookie('internal_reload_count', 0, {
        sameSite: 'lax',
        maxAge: -1,
      });

      // If normal resetErrorBoundary does not work, then auto-reload once
      // and stop
      if (allowAutoReload) {
        // console.info('RETRY:: Auto reload, with cookie "allow_auto_reload" to false');
        setCookie('allow_auto_reload', 'false', {
          sameSite: 'lax',
        });
        window.location.reload();
      } else {
        // console.info('RETRY:: remove cookie "allow_auto_reload"');
        setCookie('allow_auto_reload', 'true', {
          sameSite: 'lax',
          maxAge: -1,
        });
      }
    }
  }, []);

  return <>An Error Occured while loading site.</>;
};
