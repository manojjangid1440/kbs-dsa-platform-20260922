# KBS credit card DSA

Fresh, documentation-first monorepo for the KBS Android application, web administration, API and background processing. Bank-reported facts come exclusively from accepted Admin MIS uploads.

Start with [AGENTS.md](AGENTS.md), then [DOCS/START-HERE.md](DOCS/START-HERE.md). Current implementation truth is [DOCS/memory/STATUS.md](DOCS/memory/STATUS.md), never a feature specification or screenshot.

The full PRD, detailed gap analysis, architecture, data contracts, acceptance criteria, small feature tasks and session handoff live under `DOCS/`. There is no dependence on prior chat memory.

The first delivery implements the shared core and app foundations. External providers and unresolved commercial policies must not be represented as working integrations. See the current status for exact verification and outstanding work.

## Run the foundation

Requires Node 24 and npm. From the repository root:

```bash
npm ci
npm run check
npm run dev:web
```

Web runs on `http://127.0.0.1:3000`. In separate terminals, `npm run dev:api` starts the API on port 4000, and `npm run dev:mobile` starts Expo. The web/native preview uses explicitly labelled synthetic records. Real OTP sign-in is unavailable until F01/F02. The API readiness endpoint intentionally returns 503; liveness is available at `/health/live`.

To build the web app: `npm run build:web`. To verify the native bundle: `cd apps/mobile` then `npx expo export --platform android --output-dir /tmp/kbs-android-bundle`. Native bundle export is not APK packaging. Android device, secure-window, telephony and signed APK acceptance remain pending.

| Workspace | Purpose |
| --- | --- |
| apps/web | Next.js and shadcn/ui web foundation |
| apps/mobile | Expo React Native Android foundation |
| apps/api | Fastify validation and guarded API boundary |
| apps/worker | Background-job contract; durable handlers pending |
| packages | Shared contracts, domain, config, database, integrations, tokens and web UI |
| DOCS | Full requirements, decisions, feature tasks, verification and durable session handoff |

## Continue in a new chat

Give the next agent this repository and say: “Read AGENTS.md and DOCS/START-HERE.md, inspect the current Git status and DOCS/memory files, then continue the first unblocked task from DOCS/memory/NEXT.md. Commit each completed small task.”

The delivered archive includes the local `.git` history. Unzip with hidden files preserved to keep all commits. No existing repository was used and no remote repository was created or pushed.
