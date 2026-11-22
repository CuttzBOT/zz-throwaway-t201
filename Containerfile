# Non-root image. The pipeline passes VERSION (the release tag); /healthz returns it.
FROM docker.io/library/node:26-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5
WORKDIR /app
COPY package.json server.js ./
ARG VERSION=dev
ENV VERSION=$VERSION NODE_ENV=production
# A numeric UID above 0: a name can map to root. The app only reads its files.
USER 10001:10001
EXPOSE 3000
CMD ["node", "server.js"]
