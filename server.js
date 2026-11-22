// Example app. Replace the handler; keep the three contract habits:
// PORT from the environment, /healthz returns the build version, secrets
// come from /run/secrets/app.json and are passed on, never put in process.env.
import { createServer } from "node:http";
import { readFileSync } from "node:fs";

const APP_JSON = "/run/secrets/app.json";
const REQUIRED_KEYS = ["greeting"]; // every key the app needs; list them in README.md

function loadSecrets() {
  let secrets;
  try {
    secrets = JSON.parse(readFileSync(APP_JSON, "utf8"));
  } catch (err) {
    throw new Error(`cannot read ${APP_JSON}: ${err.message}`);
  }
  const missing = REQUIRED_KEYS.filter((k) => typeof secrets[k] !== "string" || !secrets[k]);
  if (missing.length) {
    throw new Error(`${APP_JSON} is missing required key(s): ${missing.join(", ")}`);
  }
  return secrets;
}

// Hand each secret only to the code that needs it.
function makeHandler({ greeting }) {
  return (req, res) => {
    const path = new URL(req.url, "http://localhost").pathname;
    if (path === "/healthz") {
      res.writeHead(200, { "content-type": "text/plain" });
      return res.end(`ok ${process.env.VERSION || "dev"}\n`);
    }
    res.writeHead(200, { "content-type": "text/plain" });
    // Never echo a secret; this only shows that it loaded.
    res.end(`Hello. Greeting loaded: ${greeting.length > 0}. Public URL: ${process.env.PUBLIC_URL || "unset"}\n`);
  };
}

let secrets;
try {
  secrets = loadSecrets();
} catch (err) {
  console.error(`startup error: ${err.message}`);
  process.exit(1);
}
const port = Number(process.env.PORT || 3000);
const server = createServer(makeHandler({ greeting: secrets.greeting })).listen(port, () => {
  console.log(`listening on ${port}`);
});
// PID 1 gets no default signal handling: stop cleanly so restarts are fast.
for (const sig of ["SIGTERM", "SIGINT"]) process.on(sig, () => server.close(() => process.exit(0)));
