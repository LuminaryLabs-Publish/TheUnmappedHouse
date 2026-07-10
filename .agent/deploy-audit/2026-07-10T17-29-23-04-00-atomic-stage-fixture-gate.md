# Deploy audit: atomic StageKit fixture gate

Timestamp: `2026-07-10T17-29-23-04-00`

## Current gate

`npm run check` only syntax-checks four source files. GitHub Pages deploys on pushes to `main`, so a syntactically valid but destructively failing scene load can still ship.

## Required pre-deploy gate

```txt
node scripts/validate-stage-preflight.mjs
node scripts/validate-stage-atomic-commit.mjs
node scripts/validate-stage-resource-lifetime.mjs
node scripts/validate-story-stage-correlation.mjs
npm run check
```

## Failure-injection matrix

```txt
invalid camera descriptor
invalid fog/post values
invalid layer dimensions
unsupported prop kind
duplicate hotspot id
geometry factory failure
material factory failure
hotspot factory failure
commit failure before swap
commit failure after provisional build
first-frame acknowledgement mismatch
```

## Required deployment assertions

- All three authored scenes pass preflight.
- Every injected failure preserves the prior active scene.
- Provisional resources are disposed after failure.
- Successful replacement produces one active scene epoch.
- Retired resources are disposed exactly once.
- Story scene id, StageKit epoch scene id, and first presented frame agree.
- Diagnostics are JSON-safe.
- Existing route, copy, visuals, fixed aspect, and pacing remain unchanged.

## Current validation status

Documentation-only. Runtime source and workflow configuration were not changed. The fixture scripts do not exist, so no new deploy gate was executed or claimed.
