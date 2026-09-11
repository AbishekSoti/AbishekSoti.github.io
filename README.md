# Abishek Soti Portfolio

Public portfolio for [abisheksoti.github.io](https://abisheksoti.github.io).

Abishek Soti is a Software Engineer and Machine Learning Engineer working across acoustic ML, computer vision, neuromorphic sensing, embedded inference and research engineering.

## Stack

- React 19 and Vite
- JavaScript and CSS
- GitHub Pages
- GitHub Actions

## Routes

- `/` - Selected work and current reading
- `/projects` - Filterable engineering portfolio
- `/contact` - Public contact links and embedded resume
- `/projects/:slug` - Project case studies

The fuller About, Approach and Capabilities pages remain in source but are intentionally excluded from public navigation and builds for now.

## Local Development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

## Verification

```bash
npm run check
```

This runs the public-safety scan and production build. The generated site is written to `dist/`, including static route entry points and a custom `404.html` for GitHub Pages.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which audits dependencies, checks the repository for likely secrets and private artifacts, builds the site and deploys it to GitHub Pages.

## Research Radar

`.github/workflows/update-radar.yml` refreshes `src/data/radar.generated.json` weekly from public Hugging Face, PyTorch, GitHub Blog and arXiv feeds. It does not use external API keys. Its short-lived GitHub Actions token is limited to committing the generated JSON and is never included in the browser build.

Run the updater locally with:

```bash
npm run radar:update
```

## Public Safety

Do not commit credentials, private datasets, model checkpoints, private contact information, local paths or unpublished research material. Values prefixed with `VITE_` are public after build and must never contain secrets. See [SECURITY.md](SECURITY.md) for the repository policy.

Project links render only when real public URLs exist in `src/data/projects.js`.
