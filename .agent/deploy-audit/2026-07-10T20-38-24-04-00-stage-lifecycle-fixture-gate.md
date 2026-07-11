# Deploy audit: Stage lifecycle fixture gate

Timestamp: `2026-07-10T20-38-24-04-00`

## Current gate

```txt
npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

This proves syntax only. It does not import the CDN-backed StageKit under Node, build scene plans, inject preparation failures, count disposals, validate stage epochs or prove host teardown.

## Required headless gate

```txt
node scripts/validate-stage-build-plan.mjs
node scripts/validate-atomic-stage-commit.mjs
node scripts/validate-resource-ledger.mjs
node scripts/validate-hotspot-stage-epoch.mjs
node scripts/validate-stage-host-disposal.mjs
```

Pure planning, decision and accounting code must remain free of DOM and Three.js imports so these fixtures can execute in Node.

## Required package gate

```json
{
  "scripts": {
    "check:syntax": "node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js",
    "check:stage-plan": "node scripts/validate-stage-build-plan.mjs",
    "check:stage-commit": "node scripts/validate-atomic-stage-commit.mjs",
    "check:stage-resources": "node scripts/validate-resource-ledger.mjs",
    "check:stage-interaction": "node scripts/validate-hotspot-stage-epoch.mjs",
    "check:stage-disposal": "node scripts/validate-stage-host-disposal.mjs",
    "check": "npm run check:syntax && npm run check:stage-plan && npm run check:stage-commit && npm run check:stage-resources && npm run check:stage-interaction && npm run check:stage-disposal"
  }
}
```

## Browser smoke requirement

A browser smoke remains necessary for real WebGL disposal and event-loop behavior:

```txt
open clean route
load all three scenes repeatedly
confirm one committed group
inject one candidate-build failure
confirm old stage remains visible
confirm no stale hotspot admission
confirm disposal counters advance
call host dispose twice
confirm RAF stops
confirm listeners stop
confirm no WebGL errors
```

## Deployment rule

Documentation-only changes may deploy without runtime validation because no runtime files change. The future runtime implementation must not be considered complete until both the Node fixture matrix and browser lifecycle smoke pass.

## Current status

```txt
runtime source changed: no
package scripts changed: no
headless fixtures: absent
browser lifecycle smoke: absent
branch created: no
pull request created: no
push target: main
```
