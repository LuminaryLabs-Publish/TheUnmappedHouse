# Deploy audit: lifecycle fixture and check gate

Timestamp: `2026-07-10T15-58-47-04-00`

## Current package surface

```txt
npm run serve
npm run check
```

`npm run check` only runs `node --check` against:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

There is no build step, test runner, DOM-free authority fixture, browser smoke script, source fingerprint gate, save reconciliation gate, or StageKit observation gate.

## Required next gate

```txt
node scripts/validate-story-lifecycle.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-stage-observations.mjs
npm run check
```

Suggested package scripts:

```json
{
  "check:syntax": "node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js",
  "fixture:lifecycle": "node scripts/validate-story-lifecycle.mjs",
  "fixture:save": "node scripts/validate-save-reconciliation.mjs",
  "fixture:stage": "node scripts/validate-stage-observations.mjs",
  "check": "npm run check:syntax && npm run fixture:lifecycle && npm run fixture:save && npm run fixture:stage"
}
```

## Lifecycle fixture matrix

```txt
source-manifest-stable
source-fingerprint-stable
initial-state-exploring
inspect-first-accepted
inspect-repeat-no-mutation
inspect-origin-parity
scene-completion-single-transition
completion-single-timer-intent
interlude-open-readback
continue-before-interlude-rejected
continue-next-scene-accepted
stage-load-readback
continue-terminal-accepted
terminal-state-persisted
reset-clear-readback
replay-equality
json-safe-diagnostics
```

## Save fixture matrix

```txt
empty-storage
valid-round-trip
invalid-json
invalid-nested-types
unknown-scene-repair
unknown-clue-repair
invalid-route-repair
source-mismatch
interlude-round-trip
terminal-round-trip
write-failure
clear-failure
```

## Stage fixture matrix

```txt
library-load-counts
hallway-load-counts
closet-load-counts
side-panel-vs-raycast-hotspot-parity
raycast-miss-observed
scene-replacement-resource-counts
old-geometry-disposed
old-materials-disposed
dispose-stops-frame-loop
dispose-removes-listeners
```

## Browser smoke after fixtures

```txt
load first scene
inspect through side panel
inspect through stage raycast
complete scene and open one interlude
advance and observe expected scene
reload and restore legal lifecycle
complete final scene and persist terminal state
reset and confirm clean initial state
```

## This docs-only pass

```txt
runtime source changed: no
package scripts changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run in connector-only environment
browser smoke: not run
proposed fixtures: not run because modules do not exist
```

## Gate rule

Do not require visual changes to pass this gate. The gate should prove authority, lifecycle, persistence, and StageKit observations while preserving the current route and rendering.