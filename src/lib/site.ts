/** Production origin (canonical / OG). Override via NEXT_PUBLIC_SITE_ORIGIN on CI. */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://example.com";

export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";
