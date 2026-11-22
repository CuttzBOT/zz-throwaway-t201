# app-starter

The template every new ArachneDev app repo is created from. It builds as is and passes the shared pipeline; edit `server.js` and keep the README sections below true.

`.github/ISSUE_TEMPLATE/new-app.yml` is the hosting request form for this template repo only; it is removed from new repos.

## Port

3000 (the `PORT` variable overrides it). The only route besides `/` is `/healthz`, which returns `ok <version>`, the `VERSION` build argument.

## Volumes

None. The example writes nothing. List every path the app must keep, so the host can mount and back it up.

## Dependencies

None. List every external service (database, API, bot token) the app calls.

## Memory

Peak about 57 MB of resident memory under load (3000 `/healthz` requests, 20 at a time) and about 16 MB idle [Local test, Node 22 on Alpine, 64 MB limit]. The pipeline default of 512m is plenty. Replace this with your own app's measured peak, and pass it as `memory` (peak plus 25 to 50 percent) if you want a tighter limit.

## Secrets

The app reads them from `/run/secrets/app.json`, a JSON object (see `ci/app.json` for the shape). It passes each value to the code that needs it and never copies it into the environment. A missing file or key stops the app at start-up with `startup error: ...`. `ci/app.json` holds fake values for the pipeline's contract test only.

## CI

`.github/workflows/release.yml` calls the shared build in `ArachneDev/app-pipeline`: pull requests build, scan and run the contract test; a version tag such as `v1.0.0` also pushes the image to ghcr.io.

## Before the first commit

Install the gitleaks hook: `pip install pre-commit && pre-commit install`. Turn on GitHub push protection for the repo.

Keep `AGENTS.md`: it carries the container contract for you and your agents.
