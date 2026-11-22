# Secrets for this stack

Values here are encrypted with the stack's public key. The host decrypts them; you can't read one back.

Install `age` once: `brew install age` (macOS), `sudo apt install age` or `sudo dnf install age` (Linux), `scoop install age` (Windows, then use Git Bash).

| To | Run |
|---|---|
| Set or change | `./set-secret NAME`, then type the value (hidden). Piped input works: `printf '%s' "$VALUE" \| ./set-secret NAME` |
| Use staging | `./set-secret NAME --env staging` |
| Pick a container | `./set-secret NAME --container web` (needed when the stack has none yet or more than one) |
| Delete | `./set-secret NAME --delete` |
| List names | `ls prod/*` (or `staging/*`) |
| Undo | `git revert <commit>`, then `git push` |

- `NAME` is capital letters, digits and `_`, starting with a letter: `DISCORD_TOKEN`.
- Never put a value on the command line; the script refuses. Trailing newlines are removed, and a value is at most 64 KB.
- The app has the change within about 5 minutes, in `/run/secrets/app.json`.
