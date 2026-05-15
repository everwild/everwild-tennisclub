# everwild-tennisclub

Static marketing site for **EVERWILD Tennis Club (ETC)** — courts, coaching, and community. Built with Next.js (App Router), TypeScript, and Tailwind CSS, aligned with the [everwild-runningclub-next](https://github.com/everwild/everwild-runningclub-next) layout patterns.

- **Output:** static export (`out/`) — suitable for Vercel, S3, or any static host  
- **Languages:** `ja`, `en`, `zh` under `/[lang]/`  
- **Default entry:** `/` redirects to `/zh/`

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000/zh/](http://localhost:3000/zh/) (or `/ja/`, `/en/`).

```bash
npm run build   # produces static files in out/
npm run lint
```

## Configuration

| Item | Location |
|------|----------|
| Production URL (canonical, OG) | [`src/lib/site.ts`](src/lib/site.ts) — `SITE_ORIGIN` |
| Contact form (optional) | Env `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (Formspree) |
| Image paths & placeholders | [`src/config/tennis-assets.ts`](src/config/tennis-assets.ts) |
| Copy / i18n | [`src/messages/`](src/messages/) |

Before launch, replace `SITE_ORIGIN` with your real domain (e.g. `https://www.example.com`, no trailing slash).

## Project layout

```
src/app/[lang]/     Home, contact, legal, privacy, terms
src/components/     SiteHeader, SiteFooter, home sections
src/styles/         site-core.css, home.css, overrides
public/assets/images/   Drop images here (see README files in each folder)
```

Browser tab title on all pages: **ETC · EVERWILD Tennis Club**.

## Deployment

See **[DEPLOY.md](./DEPLOY.md)** for Vercel, custom domain, Formspree, and replacing media placeholders.

## Repository

https://github.com/everwild/everwild-tennisclub
