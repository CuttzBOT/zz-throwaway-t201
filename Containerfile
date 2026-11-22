# Non-root image. The pipeline passes VERSION (the release tag); /healthz returns it.
FROM docker.io/library/node:22-alpine@sha256:12f54cafa58d0e96554ae05871e29663ff7241836377dc9a7916449b8adb062c
WORKDIR /app
COPY package.json server.js ./
ARG VERSION=dev
ENV VERSION=$VERSION NODE_ENV=production
# A numeric UID above 0: a name can map to root. The app only reads its files.
USER 10001:10001
EXPOSE 3000
CMD ["node", "server.js"]
