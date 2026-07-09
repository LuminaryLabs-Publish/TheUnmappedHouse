# Deploy Audit: Story Fixture Validation Wire Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T07-48-29-04-00`

## Summary

The current deploy/check surface is intentionally light: `package.json` exposes a static server command and syntax checks for the source modules.

The next deploy-safe improvement should wire a DOM-free story-authority fixture before any browser-only smoke or visual expansion.

## Current scripts

```json
{
  "serve": "python3 -m http.server 8080",
  "check": "node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js"
}
```

## Current validation gap

```txt
npm run check proves syntax only.
No fixture proves source descriptors.
No fixture proves command/result statuses.
No fixture proves save normalization.
No fixture proves route progression.
No fixture proves stage projection.
No fixture proves browser adapter plan/readback.
No fixture proves GameHost diagnostics.
No fixture proves central ledger readback.
```

## Required validation path next

```txt
1. Keep existing static route and syntax check intact.
2. Add pure story-authority modules under src/story-authority/.
3. Add scripts/validate-story-authority.mjs.
4. Run node scripts/validate-story-authority.mjs directly.
5. Add the fixture to npm run check only after the direct fixture is stable.
6. Preserve npm run serve as the static browser check command.
7. Update .agent validation and central ledger after fixture output is real.
```

## Required fixture output shape

```txt
row id
command id
status
reason
before snapshot hash
accepted after snapshot hash or null
projection ids
adapter readback ids
central ledger readback id
notes
```

## Deploy safety rule

Runtime browser behavior should remain stable until the fixture proves the command/result source layer.

Do not claim deploy or runtime validation unless `npm run check`, the story fixture, and a browser route check have actually run.
