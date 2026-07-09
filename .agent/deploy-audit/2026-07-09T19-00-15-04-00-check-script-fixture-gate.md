# Deploy Audit: Check Script Fixture Gate

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T19-00-15-04-00`

## Current package surface

```txt
npm run serve
  -> python3 -m http.server 8080

npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

## Current validation gap

`npm run check` is syntax-only.

It does not prove story command behavior, repeat/no-op behavior, terminal route behavior, adapter projection, StageKit scene projection, save/interlude intent, repo-local ledger readback, or central ledger readback.

## Required next gate

After the story authority modules are added, `npm run check` should include syntax checks and the DOM-free story fixture runner.

Target gate:

```txt
node --check src/aspect-frame.js
node --check src/game.js
node --check src/stage-kit.js
node --check src/story-data.js
node --check src/story-source-manifest.js
node --check src/story-snapshots.js
node --check src/story-commands.js
node --check src/story-preflight.js
node --check src/story-results.js
node --check src/story-reducer.js
node --check src/story-projections.js
node --check src/browser-adapter-plan.js
node --check src/browser-adapter-readback.js
node --check src/story-host-diagnostics.js
node tests/fixtures/story-command-results.mjs
```

## Deployment decision

No deploy workflow changes are needed for this docs-only pass.

Do not add Pages or browser smoke churn before source-owned fixture rows exist.

## Validation this pass

```txt
runtime source changed: no
package scripts changed: no
npm run check: not run
browser smoke: not run
fixture run: not run because fixture does not exist yet
branch created: no
pull request created: no
pushed to main: yes
```
