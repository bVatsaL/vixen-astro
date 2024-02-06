const widths = [320, 640, 768, 1024, 1366, 1600, 1920];

export const getImgData = (src: string, maxWidth?: number, resize = true) => {
  if (!src) {
    return {
      src: '',
      dataSrc: '',
      dataSrcset: [],
      dataSizes: [],
      shouldLazyLoad: false,
    };
  }

  let dataSrc = src;
  const dataSrcset: string[] = [];
  let dataSizes: string[] = [];

  // Computed max width from URL, Props and Widths array
  let maxWidthAfterLoad = resize ? widths[widths.length - 1] : undefined;

  let cdnSrcUrl = new URL('https://cdn.foxdealer.com');
  const srcUrl = new URL(src, 'https://cdn.foxdealer.com');

  // Extract width from srcUrl
  const width = srcUrl.searchParams.get('w');

  // Then remove width from the SRC url as we will be using CDN to resize
  // the image
  srcUrl.searchParams.delete('w');
  const srcUrlStr = srcUrl.toString();

  /**
   * the most maxWidth of the image is: first check the width in the url
   * If the width in URL exists, use that as max width, if that does not exists,
   * then check the maxWidth passed as porps, if that does not exists then
   * use the max width from available width's array
   */
  if (width && !Number.isNaN(+width)) {
    maxWidthAfterLoad = +width;
  } else if (maxWidth) {
    maxWidthAfterLoad = maxWidth;
  }

  const initialImageWidth = 50;

  let shouldUseCdn = false;
  let shouldAppendUrl = false;
  let preserveHost = false;

  if (src.startsWith('http') && src?.indexOf('static.foxdealer.com') !== -1) {
    shouldUseCdn = true;
    shouldAppendUrl = true;
  } else if (src.startsWith('http') && src?.indexOf('cdn-pods.foxdealer.com') !== -1) {
    shouldUseCdn = true;
    shouldAppendUrl = false;
    // cdn-pods is also a cdn URL thus use the same.
    cdnSrcUrl = new URL(src);
    preserveHost = true;
  } else if (!src.startsWith('http') && process.env.IS_APP_CDN_HOSTED === 'true') {
    /**
     * @team @donnie
     * This is with assumption that all traffic is directed via cloudflare
     * and we are using cloudflare image optimization
     */
    shouldUseCdn = true;
  }
  if (src.indexOf('.svg') !== -1) {
    shouldUseCdn = false;
  }

  if (shouldUseCdn) {
    let placeholder = src;

    // Generate placeholder image of 10px for initial load
    if (shouldAppendUrl) {
      cdnSrcUrl.pathname = `/cdn-cgi/image/width=${initialImageWidth},fit=contain,quality=95,format=auto/${srcUrlStr}`;
      placeholder = cdnSrcUrl.toString();
    } else {
      cdnSrcUrl.pathname = `/cdn-cgi/image/width=${initialImageWidth},fit=contain,quality=85,format=auto${srcUrl.pathname}`;
      placeholder = preserveHost ? cdnSrcUrl.toString() : cdnSrcUrl.pathname;
    }

    /**
     * Create data-src data-srcset data-sizes for lazy load
     */
    if (shouldAppendUrl) {
      // Append full url for scernario where we are getting images from https://static.foxdealer.com
      // thus makingit as below
      // `/cdn-cgi/image/width={width},fit=contain,quality=85,format=auto/https://static.foxdealer.com/abc/ab.png`;
      cdnSrcUrl.pathname = `/cdn-cgi/image/${
        maxWidthAfterLoad ? `width=${maxWidthAfterLoad},` : ''
      }fit=contain,quality=85,format=auto/${srcUrlStr}`;
      dataSrc = cdnSrcUrl.toString();
    } else {
      // Do not append full url but just the pathname to the image thus making it as below:
      // `/cdn-cgi/image/width={width},fit=contain,quality=85,format=auto/abc/ab.png`;
      cdnSrcUrl.pathname = `/cdn-cgi/image/${
        maxWidthAfterLoad ? `width=${maxWidthAfterLoad},` : ''
      }fit=contain,quality=85,format=auto${srcUrl.pathname}`;
      dataSrc = preserveHost ? cdnSrcUrl.toString() : cdnSrcUrl.pathname;
    }

    if (resize && maxWidthAfterLoad) {
      if (maxWidthAfterLoad >= widths[0]) {
        // If width mentioned is greater than min width
        for (let i = 0; i < widths.length; i += 1) {
          const w = widths[i];
          if (w <= maxWidthAfterLoad) {
            if (shouldAppendUrl) {
              cdnSrcUrl.pathname = `/cdn-cgi/image/width=${w},fit=contain,quality=85,format=auto/${srcUrlStr}`;
              dataSrcset.push(`${cdnSrcUrl.toString()} ${w}w`);
            } else {
              cdnSrcUrl.pathname = `/cdn-cgi/image/width=${w},fit=contain,quality=85,format=auto${srcUrl.pathname}`;
              dataSrcset.push(`${preserveHost ? cdnSrcUrl.toString() : cdnSrcUrl.pathname} ${w}w`);
            }
            dataSizes.push(`(min-width: ${w}px) ${1 * w}px`);
          }
        }
      }

      if (maxWidthAfterLoad < widths[widths.length - 1]) {
        if (shouldAppendUrl) {
          cdnSrcUrl.pathname = `/cdn-cgi/image/width=${maxWidthAfterLoad},fit=contain,quality=85,format=auto/${srcUrlStr}`;
          dataSrcset.push(`${cdnSrcUrl.toString()} ${maxWidthAfterLoad}w`);
        } else {
          cdnSrcUrl.pathname = `/cdn-cgi/image/width=${maxWidthAfterLoad},fit=contain,quality=85,format=auto${srcUrl.pathname}`;
          dataSrcset.push(`${preserveHost ? cdnSrcUrl.toString() : cdnSrcUrl.pathname} ${maxWidthAfterLoad}w`);
        }
        dataSizes.push(`(min-width: ${maxWidthAfterLoad}px) ${1 * maxWidthAfterLoad}px`);
      }
    }

    dataSizes = dataSizes.reverse();
    dataSizes.push('100vw');
    return {
      src: placeholder,
      dataSrc,
      dataSrcset,
      dataSizes,
      shouldLazyLoad: shouldUseCdn,
    };
  }
  return {
    src,
    dataSrc: '',
    dataSrcset: [],
    dataSizes: [],
    shouldLazyLoad: shouldUseCdn,
  };
};
