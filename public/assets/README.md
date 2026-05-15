# `public/assets` layout (ERC-style)

Static files under `public/` are served as-is at the site root.

- **`images/`** — raster/vector assets. Subfolders (`hero/`, `about/`, `schedule/`, `routes/`, `gallery/`, `logo/`) each contain a **README.md** listing expected filenames.
- **`_placeholder.svg`** — default image used while `USE_MEDIA_PLACEHOLDER` is `true` in `src/config/tennis-assets.ts`.

Do not commit huge binaries if you use Git LFS; otherwise add real files and flip the flag as documented in `DEPLOY.md`.
