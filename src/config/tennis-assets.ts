/**
 * Image pipeline for the ERC-layout tennis site.
 * - Set `USE_MEDIA_PLACEHOLDER` to `false` after you drop real files under `public/assets/images/...`
 *   (see each folder’s README).
 * - `expectedPath` is still written to `data-expected` for quick DOM inspection in DevTools.
 */
export const USE_MEDIA_PLACEHOLDER = true;

export const MEDIA_PLACEHOLDER = "/assets/images/_placeholder.svg";

export function mediaSrc(expectedPath: string): string {
  return USE_MEDIA_PLACEHOLDER ? MEDIA_PLACEHOLDER : expectedPath;
}

export const TENNIS_IMAGE_MANIFEST = {
  logo: {
    brandDefault: "/assets/images/logo/brand-mark-default.png",
    brandHover: "/assets/images/logo/brand-mark-hover.png",
    favicon: "/assets/images/logo/favicon.png",
    horizontal: "/assets/images/logo/horizontal-white.png",
    partner: "/assets/images/logo/partner-placeholder.png"
  },
  hero: [1, 2, 3, 4, 5].map((n) => `/assets/images/hero/hero-${n}.webp`),
  aboutCarousel: [1, 2, 3, 4, 5].map((n) => `/assets/images/about/about-${n}.webp`),
  scheduleCards: [
    "/assets/images/schedule/schedule-1.jpg",
    "/assets/images/schedule/schedule-2.jpg",
    "/assets/images/schedule/schedule-3.jpg",
    "/assets/images/schedule/schedule-4.jpg",
    "/assets/images/schedule/schedule-5.jpg"
  ],
  routes: {
    courtA: "/assets/images/routes/court-a.webp",
    courtB: "/assets/images/routes/court-b.webp"
  },
  gallery: [1, 2, 3, 4, 5, 6].map((n) => `/assets/images/gallery/gallery-${n}.webp`)
} as const;
