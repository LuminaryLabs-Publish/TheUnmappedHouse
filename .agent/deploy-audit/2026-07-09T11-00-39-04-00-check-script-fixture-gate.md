# Check Script Fixture Gate

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T11-00-39-04-00`

## Current validation surface

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` currently runs syntax checks only:

```txt
node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

## Required future wiring

```txt
scripts/validate-story-authority.mjs
  -> validates source manifest
  -> validates story descriptors
  -> validates stage snapshots
  -> replays command cases
  -> emits command result rows
  -> emits browser adapter plan rows
  -> emits repo-local ledger readback row
  -> emits central ledger readback row
```

## Package gate target

```json
{
  "scripts": {
    "check": "node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js && node scripts/validate-story-authority.mjs"
  }
}
```

## Validation status this pass

```txt
Runtime source changed: no
package.json changed: no
fixture script created: no
fixture run: no
local validation: no
browser validation: no
```
