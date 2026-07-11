# Security Notes

This portfolio is intended to be public.

Do not commit:

- API keys or service tokens
- Cloud credentials
- Private dataset paths or private data
- Unpublished implementation details that should stay research-private
- Real `.env` files

Use `.env.example` only for non-secret placeholder variable names. Any value prefixed with `VITE_` is exposed to the browser after build, so it must be safe for the public.
