# Static site served by Caddy. Railway detects this Dockerfile automatically.
FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile

# Copy only what the site actually needs at runtime —
# the "Product Images" originals stay out of the image.
COPY index.html /srv/index.html
COPY assets     /srv/assets

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- "http://127.0.0.1:${PORT:-8080}/" >/dev/null || exit 1
