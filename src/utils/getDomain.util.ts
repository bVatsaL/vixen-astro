export const getDomain = (u: any, s?: any) => {
    let url = u;
    let subdomain = s;
    subdomain = subdomain || false;
    url = url?.replace(/(https?:\/\/)?(www.)?/i, '');
    if (!subdomain) {
      url = url.split('.');
      url = url.slice(url.length - 2).join('.');
    }
    if (url.indexOf('/') !== -1) {
      return url.split('/')[0];
    }
    return url;
  };