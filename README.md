# linconvidal-site

Static personal site for `linconvidal.com`.

A personal home for software, photography, games, and notes. Built with Astro and deployed as static files so hosting can stay simple and cheap.

## Sections

- `/photography`: photo essays, zines, selected prints, and photographs.
- `/software`: Cobogó, Farol, SpatialMD, tools, and infrastructure work.
- `/games`: Pinote, prototypes, and devlogs.
- `/notes`: essays, field notes, devlogs, and blog-like writing.

## Commands

```bash
npm ci
npm run dev
npm run check
npm run build
```

## GitHub Pages release

Deployment is configured with GitHub Actions in `.github/workflows/deploy.yml`.

Expected setup:

1. Push the repo to GitHub with `main` as the default branch.
2. In GitHub repo settings, set **Pages > Build and deployment > Source** to **GitHub Actions**.
3. Keep `public/CNAME` as `linconvidal.com` for the custom domain.
4. Point DNS for `linconvidal.com` to GitHub Pages.

Apex DNS records:

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
AAAA  @     2606:50c0:8000::153
AAAA  @     2606:50c0:8001::153
AAAA  @     2606:50c0:8002::153
AAAA  @     2606:50c0:8003::153
```

Optional `www` record:

```text
CNAME www   linconvidal.github.io
```

After the first successful deploy, enable **Enforce HTTPS** in the GitHub Pages settings.
