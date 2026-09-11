# Security Notes

This portfolio is a public, client-side website. Treat every tracked file and every value bundled by Vite as publicly readable.

## Never Commit

- API keys, passwords, service tokens or cloud credentials
- Real `.env`, `.npmrc`, certificate or private-key files
- Private datasets, unpublished research files or model checkpoints
- Phone numbers, home addresses or local absolute paths
- Database files, infrastructure state or credential exports

Any variable prefixed with `VITE_` is embedded in the browser build. It must never contain a secret.

## Automated Gates

Run the public-safety check before every build:

```bash
npm run security:check
```

The GitHub Pages workflow runs this check and a high-severity dependency audit before deployment. It reports only the filename and rule name, never the matched value.

The research-radar workflow reads public, unauthenticated feeds. It uses no external API key. Checkout does not retain credentials, and GitHub's short-lived `GITHUB_TOKEN` is exposed only to the final push step with `contents: write`. The token is never passed to dependencies, the feed updater, Vite or site content.

## Future Services

If the portfolio later needs authenticated APIs, keep credentials in a server-side service or a trusted deployment secret store. The browser should call that service through a deliberately public interface. Do not place private credentials in React code, static JSON, query strings or `VITE_` variables.
