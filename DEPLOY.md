# Deployment

## GitHub Pages (`everwild/everwild-tennisclub`)

GitHub Pages must deploy the **built static files** in `out/`, not the repo root (otherwise you only see the README).

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions** (not “Deploy from a branch”).
2. Push to `master` (or run the **Deploy to GitHub Pages** workflow manually). The workflow [`.github/workflows/deploy-gh-pages.yml`](.github/workflows/deploy-gh-pages.yml) runs `npm run build` and uploads `out/`.
3. Site URL: **https://everwild.github.io/everwild-tennisclub/** (project Pages uses `basePath` `/everwild-tennisclub`).

For a custom domain later, use Vercel or set Pages to a custom domain and drop `NEXT_PUBLIC_BASE_PATH` from the workflow.

---

## Vercel + custom domain

## 1. Production URL in code

Before going live, set your real site URL in [`src/lib/site.ts`](src/lib/site.ts):

- `SITE_ORIGIN` — must be `https://your-domain.com` (no trailing slash). This drives canonical links, `metadataBase`, and Open Graph URLs.

## 2. Optional contact form (Formspree)

1. Create a form at [Formspree](https://formspree.io/) and copy the form endpoint URL.
2. In Vercel (or your host), add an environment variable:
   - **Name:** `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
   - **Value:** `https://formspree.io/f/xxxxxxx`
3. Redeploy. If unset, the contact page shows email/phone only plus the note from copy strings.

## 3. Deploy on Vercel

1. Push this repo to GitHub (or connect your Git provider).
2. In [Vercel](https://vercel.com/), **Add New Project** and import the repository.
3. Set **Root Directory** to `everwild-tennisclub` if the repo is a monorepo; otherwise leave default.
4. Framework preset: **Next.js**. Build command: `npm run build`, output: Next static export writes to `out/` — Vercel detects Next and runs the correct flow.
5. Add env vars if using Formspree, then deploy.

## 4. Custom domain

1. In the Vercel project: **Settings → Domains** → add `www.example.com` and/or apex `example.com`.
2. At your DNS provider, add the records Vercel shows (usually `CNAME` for `www`, or `A` for apex).
3. Wait for DNS propagation, then confirm HTTPS is active.
4. Update `SITE_ORIGIN` to match the primary domain you want in search results (often `https://www.example.com`).

## 5. Verify after deploy

- Open `/`, `/zh/`, `/ja/`, `/en/` and one subpage per language (e.g. `/zh/contact/`).
- Use “View Source” or DevTools to confirm `<link rel="canonical">` points at your domain.

## 6. 媒体占位与正式切图

首页结构与 ERC 一致，使用 `<img>` 与轮播脚本。默认由 [`src/config/tennis-assets.ts`](src/config/tennis-assets.ts) 的 **`USE_MEDIA_PLACEHOLDER`** 指向 `public/assets/images/_placeholder.svg`。

1. 按 `public/assets/images/*/README.md` 放入对应文件名。
2. 将 **`USE_MEDIA_PLACEHOLDER`** 改为 **`false`** 后重新执行 `npm run build` 并部署。
