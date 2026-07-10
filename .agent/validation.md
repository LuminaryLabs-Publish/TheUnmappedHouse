# Validation: The Unmapped House

Timestamp: `2026-07-10T17-29-23-04-00`

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
atomic StageKit fixture: not run because proof modules do not exist
resource lifetime fixture: not run because ownership/disposal modules do not exist
repo-local docs pushed to main: yes
central ledger sync: complete
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

## Required next validation gate

```txt
node scripts/validate-stage-preflight.mjs
node scripts/validate-stage-atomic-commit.mjs
node scripts/validate-stage-resource-lifetime.mjs
node scripts/validate-story-stage-correlation.mjs
npm run check
```

## Required preflight rows

```txt
library-descriptor-valid
hallway-descriptor-valid
closet-descriptor-valid
invalid-camera-vector-rejected
invalid-fov-rejected
invalid-fog-rejected
invalid-layer-size-rejected
unsupported-prop-kind-rejected
duplicate-hotspot-id-rejected
invalid-material-values-rejected
invalid-post-values-rejected
```

## Required atomic commit rows

```txt
active-epoch-preserved-during-build
provisional-build-success
provisional-build-failure-disposed
commit-swaps-one-active-group
camera-fog-post-commit-together
failed-load-keeps-prior-scene
rollback-restores-prior-state
load-result-json-safe
load-result-reason-stable
```

## Required resource rows

```txt
resource-registry-counts-library
resource-registry-counts-hallway
resource-registry-counts-closet
retired-geometries-disposed-once
retired-materials-disposed-once
hotspot-resources-disposed-once
provisional-resources-disposed-on-failure
render-targets-disposed-on-host-dispose
raf-cancelled-on-host-dispose
listeners-removed-on-host-dispose
double-dispose-idempotent
zero-unowned-retired-resources
```

## Required correlation rows

```txt
story-transition-id-issued
stage-load-request-correlated
scene-id-matches-committed-epoch
first-frame-ack-matches-epoch
viewport-and-camera-fingerprint-recorded
side-panel-pick-scene-epoch
raycast-hit-scene-epoch
raycast-miss-observed
stale-retired-epoch-pick-rejected
save-scene-matches-presented-scene
gamehost-json-safe
```

## Browser smoke after fixtures

```txt
load first scene
inspect through both input origins
complete each scene and open one interlude
advance through all three scenes
confirm each story transition has one committed StageKit epoch
confirm no retired scene remains interactive
reset to clean initial state
confirm current visuals, copy, route, and pacing are unchanged
```
