# Abishek Soti Portfolio

Public portfolio for [abisheksoti.github.io](https://abisheksoti.github.io).

This site presents Abishek Soti as a Software Engineer and Machine Learning Engineer working across audio machine learning, computer vision, neuromorphic sensing, edge AI, Python engineering, model deployment and research engineering.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- GitHub Pages
- GitHub Actions

## Site Structure

- `/` - Home
- `/about` - Background, education and research experience
- `/projects` - Filterable project portfolio
- `/skills` - Technical toolkit
- `/engineering` - Production engineering focus
- `/resume` - Resume download
- `/contact` - Public contact links
- `/projects/:slug` - Project case studies

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The build outputs to `dist/`. The `postbuild` script copies `dist/index.html` to `dist/404.html` so direct route refreshes work on GitHub Pages.

## Deployment

Deployment is handled by GitHub Actions in `.github/workflows/deploy.yml`.

The selected hosting platform is GitHub Pages:

[https://abisheksoti.github.io](https://abisheksoti.github.io)

## Public Safety

This repository is intended to be public. Do not commit secrets, credentials, private datasets, model checkpoints, local file paths, private contact information or unpublished research details.

Project links are rendered only when real public URLs exist in `src/data/projects.js`.
