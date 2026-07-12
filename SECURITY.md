# Security Notes

This portfolio is intended to be public.

Do not commit:

- API keys or service tokens
- Cloud credentials
- Private dataset paths or private data
- Unpublished implementation details that should stay research-private
- Real `.env` files

This website currently does not use environment variables. If environment variables are added later, remember that any `VITE_` value is exposed to the browser after build and must be safe for the public.
