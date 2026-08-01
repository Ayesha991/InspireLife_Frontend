/**
 * Cloudinary Responsive Image Utility
 * 
 * Transforms image URLs with Cloudinary transformation parameters:
 * Mobile / Tablet: w_800,h_600,c_limit,q_auto,f_auto
 * Desktop: w_1920,h_1080,c_limit,q_auto,f_auto
 * 
 * Exception: Images in /assets/desktop/ and /assets/mobile/ are pre-optimized and bypassed.
 */

const CLOUD_NAME = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDINARY_CLOUD_NAME) || 'maoy1krg';

/**
 * Generates a Cloudinary URL with responsive transformations
 * @param {string} url - Base image URL or public_id
 * @param {'mobile' | 'desktop'} device - Target device type
 * @returns {string} Transformed image URL
 */
export function getCloudinaryUrl(url, device = 'desktop') {
  if (!url) return '';

  // Bypass pre-optimized images in desktop and mobile asset folders
  if (
    url.includes('/assets/desktop/') ||
    url.includes('/assets/mobile/') ||
    url.includes('/ipts/assets/desktop/') ||
    url.includes('/ipts/assets/mobile/')
  ) {
    return url;
  }

  // Cloudinary URL transformation parameters according to requirements:
  // Mobile / Tablet: w_800,h_600,c_limit,q_auto,f_auto
  // Desktop: w_1920,h_1080,c_limit,q_auto,f_auto
  const transformParams = device === 'mobile'
    ? 'w_800,h_600,c_limit,q_auto,f_auto'
    : 'w_1920,h_1080,c_limit,q_auto,f_auto';

  // Return as-is if already transformed with exact parameters
  if (url.includes(transformParams)) {
    return url;
  }

  // Handle full Cloudinary HTTP/HTTPS URLs
  if (url.includes('res.cloudinary.com') || url.includes('/image/upload/')) {
    return url.replace(/\/image\/upload\/(v\d+\/)?/, (match, version) => {
      return `/image/upload/${transformParams}/${version || ''}`;
    });
  }

  // Handle bare public IDs (e.g. "ipts/products/oil_field_equipment/air_control_valves")
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    const cleanPublicId = url.replace(/^\//, '');
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformParams}/${cleanPublicId}`;
  }

  // Fallback for non-Cloudinary external images
  return url;
}

