import React from 'react';
import { getCloudinaryUrl } from '../../utils/cloudinary';

/**
 * CloudinaryImage Component
 * Serves responsive images using Cloudinary URL parameters:
 * - Mobile/Tablet (< 1024px): w_800,h_600,c_limit,q_auto,f_auto
 * - Desktop (>= 1024px): w_1920,h_1080,c_limit,q_auto,f_auto
 */
export default function CloudinaryImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  loading = 'lazy',
  ...props
}) {
  if (!src) return null;

  const isCloudinary = src.includes('res.cloudinary.com') ||
    src.includes('/image/upload/') ||
    (!src.startsWith('http://') && !src.startsWith('https://'));

  if (!isCloudinary) {
    return <img src={src} alt={alt} className={className || imgClassName} loading={loading} {...props} />;
  }

  const mobileSrc = getCloudinaryUrl(src, 'mobile');
  const desktopSrc = getCloudinaryUrl(src, 'desktop');

  const combinedClass = [className, imgClassName].filter(Boolean).join(' ');

  return (
    <picture className="contents">
      <source media="(max-width: 1023px)" srcSet={mobileSrc} />
      <source media="(min-width: 1024px)" srcSet={desktopSrc} />
      <img
        src={desktopSrc}
        alt={alt}
        className={combinedClass}
        loading={loading}
        {...props}
      />
    </picture>
  );
}
