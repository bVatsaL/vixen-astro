import { getImgData } from '@utils/image.util';
import cn from 'classnames';
import { type DetailedHTMLProps, type FC, type ImgHTMLAttributes, useEffect, useRef } from 'react';

// const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

type Image = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Img: FC<
  Image & {
    src: string;
    alt?: string;
    className?: string;
    maxWidth?: number;
    loading?: 'lazy' | 'eager';
    aspectRatio?: string;
    objectFit?: string;
    style?: {};
  }
> = ({ src: imgSrc, alt, className, maxWidth, loading, aspectRatio, objectFit = 'contain', style = {}, ...otherProps }) => {
  const src = (imgSrc ?? '') || '';
  const prevSrcRef = useRef<string>(src);
  const eagerLoad = loading === 'eager';
  const loadedRef = useRef<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const data = getImgData(src, maxWidth);
  useEffect(() => {
    if (src !== prevSrcRef.current) {
      loadedRef.current = false;
      prevSrcRef.current = src;
    }
  }, [src]);
  // let onLoad = () => {};
  // if (src && !eagerLoad && data.shouldLazyLoad) {
  //   onLoad = () => {
  //     if (loadedRef.current) {
  //       return;
  //     }
  //     loadedRef.current = true;
  //     if (imgRef.current) {
  //       const preloadedImg = new window.Image();
  //       // Do not change SRC, only update srcSet and sizes
  //       // preloadedImg.src = imgRef.current.src;
  //       preloadedImg.srcset = data.dataSrcset.join(',');
  //       preloadedImg.sizes = data.dataSizes.join(',');
  //       preloadedImg.src = data.dataSrc;
  //       preloadedImg.onload = () => {
  //         if (imgRef.current) {
  //           // Do not change SRC, only update srcSet and sizes
  //           // imgRef.current.src = preloadedImg.src;
  //           imgRef.current.srcset = preloadedImg.srcset;
  //           imgRef.current.sizes = preloadedImg.sizes;
  //           // @ts-ignore
  //           imgRef.current?.closest('.swiper')?.swiper?.update();
  //         }
  //       };
  //     }
  //   };
  // }
  // useIsoLayoutEffect(() => {
  //   const onReadyStateChange = () => {
  //     if (
  //       src &&
  //       !eagerLoad &&
  //       document.readyState === 'complete' &&
  //       !loadedRef.current &&
  //       imgRef.current &&
  //       imgRef.current.complete
  //     ) {
  //       onLoad();
  //     }
  //   };
  //   document.addEventListener('readystatechange', onReadyStateChange, {
  //     passive: true,
  //   });
  //   onReadyStateChange();
  //   return () => {
  //     document.removeEventListener('readystatechange', onReadyStateChange);
  //   };
  // }, [loading, src]);

  if (!src) {
    return null;
  }

  if (aspectRatio) {
    style.maxWidth = '100%';
    style.objectFit = objectFit as any;
    style.objectPosition = 'center';
    style.height = 'auto';
  }
  if (eagerLoad) {
    return (
      <img
        {...otherProps}
        loading={loading ?? 'lazy'}
        className={className}
        style={{ ...(style ?? {}), aspectRatio }}
        // src={data.dataSrc}
        // srcSet={data.dataSrcset.join(',')}
        // sizes={data.dataSizes.join(',')}
        src={data.dataSrc}
        srcSet={data.dataSrcset.join(',')}
        sizes={data.dataSizes.join(',')}
        alt={alt}
        ref={imgRef}
      />
    );
  }

  return (
    <img
      {...otherProps}
      loading={loading ?? 'lazy'}
      className={cn('lazyload', className)}
      style={{ ...(style ?? {}), aspectRatio }}
      // src={data.src}
      // data-src={data.dataSrc}
      // data-srcset={data.dataSrcset.join(',')}
      // data-sizes={data.dataSizes.join(',')}
      src={data.dataSrc || data.src}
      srcSet={data.dataSrcset.join(',')}
      sizes={data.dataSizes.join(',')}
      alt={alt}
      ref={imgRef}
    />
  );
};
