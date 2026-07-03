# linconvidal-site

Static personal site for `linconvidal.com`.

A small personal site for photographs, software, games, and notes. Built with Astro and deployed as static files so hosting can stay simple and cheap.

## Sections

- `/photography`: photographs and edits.
- `/software`: Cobogó, Farol, and SpatialMD.
- `/games`: mostly Pinote for now.
- `/notes`: writing worth keeping around.

## Commands

```bash
npm ci
npm run dev
npm run check
npm run build
```

## GitHub Pages release

Deployment is built by GitHub Actions in `.github/workflows/deploy.yml` and published to the `gh-pages` branch.

Expected setup:

1. Push the repo to GitHub with `main` as the default branch.
2. In GitHub repo settings, set **Pages > Build and deployment > Source** to **Deploy from a branch**.
3. Set the branch to **gh-pages** and the folder to **/**.
4. Keep `public/CNAME` as `linconvidal.com` for the custom domain.
5. Point DNS for `linconvidal.com` to GitHub Pages.

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
