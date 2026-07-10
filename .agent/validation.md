# Validation: The Unmapped House

Timestamp: `2026-07-10T15-58-47-04-00`

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run in connector-only environment
browser smoke: not run
DOM-free lifecycle fixture: not run because proof modules do not exist
StageKit resource fixture: not run because observation/disposal modules do not exist
repo-local docs pushed to main: yes
central ledger sync: pending
```

## Available validation

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

## Missing validation

- No source manifest/fingerprint stability test.
- No DOM-free story state, command, result, transition, or lifecycle transaction test.
- No accepted/rejected/no-mutation/effect-only result matrix.
- No side-panel versus StageKit raycast result-parity test.
- No raycast-miss observation test.
- No exactly-once interlude timer/effect test.
- No continue-before-interlude rejection test.
- No next-scene or terminal transaction test.
- No source-versioned save reconciliation or failure-injection test.
- No interlude or terminal save round-trip test.
- No StageKit load/pick/frame/resource observation test.
- No old geometry/material disposal test.
- No frame-loop/listener teardown test.
- No replay equality or JSON-safe `GameHost` diagnostics test.

## Required next validation gate

```txt
node scripts/validate-story-lifecycle.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-stage-observations.mjs
npm run check
```

## Required lifecycle rows

```txt
source-manifest-stable
source-fingerprint-stable
initial-state-exploring
inspect-accepted-side-panel
inspect-accepted-stage-raycast
inspect-origin-result-parity
inspect-repeat-no-mutation
inspect-unknown-rejected
inspect-scene-mismatch-rejected
scene-completion-single-transition
completion-single-timer-intent
duplicate-effect-skipped
interlude-open-readback
continue-before-interlude-rejected
continue-next-scene
continue-terminal
terminal-state-persisted
reset-clear-readback
replay-equality
gamehost-json-safe
```

## Required save rows

```txt
empty-storage-initial-state
valid-save-round-trip
invalid-json-recovery
valid-json-invalid-types
unknown-scene-repair
unknown-clue-repair
invalid-route-repair
source-fingerprint-mismatch
interlude-open-round-trip
terminal-round-trip
write-failure-observed
clear-failure-observed
```

## Required StageKit rows

```txt
library-load-counts
hallway-load-counts
closet-load-counts
raycast-hit-observed
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
inspect through both input origins
open one interlude after completion
advance through all three scenes
persist and restore terminal state
reset to clean initial state
confirm current visuals and pacing are unchanged
```