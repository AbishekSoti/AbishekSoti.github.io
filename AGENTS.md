# Portfolio Repository Instructions

## Purpose
This repository contains Abishek Soti's public portfolio website. The site should present him as a broader Software Engineer and Machine Learning Engineer, with MPhil research strengthening the engineering profile rather than defining the entire identity.

## Positioning
Use the primary positioning:

`Software Engineer | Machine Learning Engineer | MPhil Researcher`

The portfolio should highlight work across:

- Audio machine learning and signal processing
- Computer vision
- Event-based vision and neuromorphic sensing
- Embedded and edge AI
- Python software engineering
- Model deployment
- Research engineering

Do not present the site primarily as an academic CV or as only an underwater-audio research profile.

## Content Rules
- Do not invent projects, results, URLs, metrics, employers, publications, demos or technologies.
- Preserve valid existing content and links.
- If GitHub, Hugging Face, publication or demo URLs are unavailable, use obvious placeholders in project data and document where URLs must be inserted.
- Do not expose private datasets, unpublished methods, confidential research details, local file paths or experimental configurations.
- Do not claim production-scale deployment, large-scale distributed ML, commercial ML ownership or technologies not actually used.

## Project Data
Keep project information reusable in `src/data/projects.js`. Avoid duplicating project copy across components.

Important project cards should communicate:

- The problem
- What was built
- Technologies used
- Verified outcomes only
- Individual contribution
- Public links only when available

Only render external buttons such as Live Demo or View Code when a real URL exists.

## Design
Maintain a modern engineering portfolio style:

- Concise hero copy
- Professional typography
- Strong contrast
- Mobile responsiveness
- Subtle technical backgrounds
- Restrained motion
- Clear hover, focus and active states
- Respect `prefers-reduced-motion`

Do not use generic AI-brain stock imagery.

## Privacy And Security
Before committing or deploying, check for:

- API keys
- Tokens
- Credentials
- `.env` files
- Private contact information
- Phone number or home address
- Private datasets
- Unpublished research files
- Model checkpoints or trained model artifacts
- Generated caches
- Local absolute paths
- Unnecessary metadata in downloadable documents

Remember that `VITE_` environment variables are exposed in browser builds and must not contain secrets.

Do not delete potentially important files without explicit user approval. Do not run destructive Git commands such as `git reset --hard`, `git clean`, force-pushes or history rewrites unless explicitly authorised for that exact action.

## Deployment
The target public site is GitHub Pages at:

`https://abisheksoti.github.io`

The intended repository name format is:

`<github-username>.github.io`

Use GitHub Actions for deployment. `npm run build` must succeed before pushing deployment changes. Direct route refreshes should work through the generated GitHub Pages fallback.
