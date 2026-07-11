# Validation: The Unmapped House

Timestamp: `2026-07-10T20-38-24-04-00`

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
stage build-plan fixture: unavailable
atomic stage-commit fixture: unavailable
resource-ledger fixture: unavailable
stage-epoch interaction fixture: unavailable
host-disposal fixture: unavailable
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
node scripts/validate-stage-build-plan.mjs
node scripts/validate-atomic-stage-commit.mjs
node scripts/validate-resource-ledger.mjs
node scripts/validate-hotspot-stage-epoch.mjs
node scripts/validate-stage-host-disposal.mjs
npm run check
```

## Required stage-build rows

```txt
scene-one-plan-has-10-meshes
scene-two-plan-has-9-meshes
scene-three-plan-has-9-meshes
all-layer-rows-validated
all-prop-rows-validated
all-hotspot-rows-validated
camera-row-validated
fog-row-validated
post-row-validated
invalid-size-rejected
unknown-prop-kind-rejected-or-normalized
plan-json-safe
live-host-untouched-during-plan
```

## Required atomic-commit rows

```txt
old-stage-visible-during-prepare
build-failure-retains-old-stage
failed-build-does-not-increment-epoch
successful-build-commits-once
successful-build-increments-epoch-once
committed-scene-id-matches-request
camera-fog-post-commit-together
previous-stage-disposed-after-commit
commit-result-json-safe
no-partial-group-visible
```

## Required resource-ledger rows

```txt
all-scene-geometries-owned
all-scene-materials-owned
hotspot-materials-owned
persistent-resources-separated
scene-one-disposal-counts-exact
scene-two-disposal-counts-exact
scene-three-disposal-counts-exact
shared-resource-disposed-once
second-ledger-dispose-is-no-op
one-live-scene-ledger-after-each-commit
zero-live-scene-ledgers-after-host-dispose
cumulative-counts-json-safe
```

## Required interaction rows

```txt
hotspot-ref-has-scene-id
hotspot-ref-has-hotspot-id
hotspot-ref-has-stage-epoch
hotspot-ref-has-source-revision
current-epoch-pick-accepted
stale-epoch-pick-rejected
hover-cleared-on-commit
hover-label-hidden-on-commit
side-panel-and-raycast-can-share-command-path
```

## Required host-lifecycle rows

```txt
constructor-does-not-create-duplicate-loop
start-is-idempotent
pause-stops-frame-submission
resume-restores-one-loop
raf-id-retained
raf-cancelled-on-dispose
resize-listener-removed
pointer-listener-removed
click-listener-removed
render-target-disposed-once
post-geometry-disposed-once
post-material-disposed-once
renderer-disposed-once
second-host-dispose-is-no-op
post-dispose-methods-return-stable-results
```

## Browser smoke after fixtures

```txt
load scene one
inspect by button and raycast
advance to scene two
confirm scene-one GPU resources retire
advance to scene three
confirm scene-two GPU resources retire
confirm one committed stage group remains
force a replacement preparation failure
confirm scene three remains visible and interactive
reset hover state during a successful commit
dispose StageKit
confirm RAF and listeners stop
confirm no WebGL errors during the route
confirm visuals, copy, framing and pacing remain unchanged
```

## Existing upstream fixture requirements retained

```txt
story manifest validation
save reconciliation
canonical hotspot command results
completion proof
source/save/render identity
```
