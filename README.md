# Personal Portfolio

A clean React + Vite portfolio for Abishek Soti, focused on machine learning, underwater acoustics, neuromorphic vision, embedded systems, and electrical engineering projects.

## Pages

- Home: `/`
- About: `/about`
- Projects: `/projects`
- Skills: `/skills`
- Engineering Focus: `/engineering`
- Resume: `/resume`
- Contact: `/contact`

## Update Your Content

- Edit profile details in `src/data/profile.js`
- Edit project cards in `src/data/projects.js`
- Edit skills in `src/data/skills.js`
- Replace `public/abishek-soti-resume.pdf` when you have a newer resume
- Add project images later by placing files in `public/` and adding image paths to `src/data/projects.js`

## Run Locally

Install dependencies once:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will print a local URL such as `http://localhost:5173/`.

## Build

Create the production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The production files are generated in `dist/`.

## Deployment

This project is ready for static hosting on Vercel, Netlify, Cloudflare Pages, GitHub Pages, or similar hosts. Do not commit `node_modules/` or `dist/`; both are ignored by `.gitignore`.

### Vercel

1. Push this `portfolio` project to GitHub.
2. In Vercel, choose **Add New Project** and import the repository.
3. Use these settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Deploy.

`vercel.json` is included so direct visits to routes like `/projects` work correctly.

### Netlify

1. Push this `portfolio` project to GitHub.
2. In Netlify, choose **Add new site** from Git.
3. Use these settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Install Command: `npm install`
4. Deploy.

`netlify.toml` is included so direct visits to routes like `/projects` work correctly.

### Custom Domain

After deployment, add the custom domain from the hosting dashboard:

- Vercel: Project Settings → Domains
- Netlify: Site Configuration → Domain Management

Then update your DNS records at your domain registrar using the records Vercel or Netlify provides. Usually this means adding either an `A` record for the root domain, a `CNAME` record for `www`, or both.

## Before Publishing

- Replace `your.email@example.com` in `src/data/profile.js`
- Update `scholarUrl` in `src/data/profile.js`
- Replace any `#` project links in `src/data/projects.js`
- Replace `public/abishek-soti-resume.pdf` whenever your resume changes

## Public Safety

This is a public portfolio. Keep private research and credentials out of the repository.

- Do not commit `.env`, `.env.local`, API keys, cloud credentials, private datasets, or unpublished implementation details.
- `.env.example` is included only to document safe public variable names.
- Any `VITE_` environment variable is bundled into the browser and must be safe to publish.
- Keep project write-ups outcome-focused when publication details are still private.

## Current Portfolio Direction

The site is positioned around becoming an industry-ready Machine Learning Engineer / AI Engineer. It emphasizes production engineering skills that improve employability: Docker, FastAPI, AWS, MLflow, CI/CD, ETL pipelines, deployment, monitoring, and MLOps.
