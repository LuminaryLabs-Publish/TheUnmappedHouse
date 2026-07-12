# Validation: The Unmapped House

Timestamp: `2026-07-11T20-11-26-04-00`

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
reason: execution container could not resolve github.com
browser smoke: not run
pointer-coordinate fixture: unavailable
pointer-revision fixture: unavailable
stale-pick fixture: unavailable
input-modality fixture: unavailable
activation-parity fixture: unavailable
visible-frame pick fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: complete after this run's central update
central internal change log: complete after this run's central update
```

## Plan ledger

**Goal:** define the executable evidence required before event-local coordinates, stale-pick rejection, input-modality support, canvas/side-panel parity, and visible-frame hotspot correctness can be claimed.

- [x] Record the current syntax-only validation boundary.
- [x] Define coordinate normalization and event-local activation fixtures.
- [x] Define stage, surface, camera, hotspot, context, and frame revision fixtures.
- [x] Define mouse, touch, pen, leave, cancel, blur, miss, and dual-ingress fixtures.
- [x] Define browser and deployed-Page evidence.
- [x] Synchronize the repo-local audit with the central ledger and internal change log.
- [ ] Implement and execute the validation gate.

## Available validation

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not instantiate a browser input loop, sample coordinates, raycast a hotspot, resize a surface, transition scenes, exercise touch or pen input, reject stale picks, compare side-panel behavior, or correlate a pick with a visible frame.

## Required validation commands

```txt
node scripts/validate-pointer-coordinate-normalization.mjs
node scripts/validate-pointer-pick-revisions.mjs
node scripts/validate-pointer-pick-results.mjs
node scripts/validate-activation-parity.mjs
node scripts/validate-pointer-observations.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:pointer-picking
```

## Required coordinate rows

```txt
client-to-canvas-coordinate-correct
canvas-to-ndc-coordinate-correct
left-top-edge-maps-correctly
right-bottom-edge-maps-correctly
center-maps-to-zero
zero-width-canvas-rejected
zero-height-canvas-rejected
nonfinite-client-x-rejected
nonfinite-client-y-rejected
canvas-rect-revision-recorded
click-sample-uses-click-event-coordinates
hover-sample-not-reused-for-click
```

## Required revision rows

```txt
sample-cites-session-generation
sample-cites-stage-epoch
sample-cites-surface-revision
sample-cites-camera-revision
sample-cites-hotspot-set-revision
sample-cites-context-generation
sample-cites-resource-generation
sample-cites-visible-frame-id
resize-invalidates-predecessor-sample
scene-change-invalidates-predecessor-sample
camera-change-invalidates-predecessor-sample
hotspot-set-change-invalidates-predecessor-sample
context-change-invalidates-predecessor-sample
restart-invalidates-predecessor-sample
disposal-rejects-late-sample
```

## Required pick-result rows

```txt
hit-resolves-one-canonical-hotspot-id
hit-never-returns-mutable-descriptor-authority
miss-is-explicit
miss-does-not-mutate-story
stale-result-is-explicit
stale-result-does-not-mutate-story
unsupported-modality-is-explicit
raycast-failure-is-explicit
duplicate-sample-is-idempotent
result-cites-sample-and-visible-frame
```

## Required modality and cancellation rows

```txt
mouse-click-before-first-move-correct
touch-activation-without-mousemove-correct
pen-activation-without-mousemove-correct
keyboard-side-panel-activation-correct
pointer-leave-clears-hover
pointer-cancel-clears-hover
window-blur-clears-hover
page-hidden-clears-or-suspends-hover
context-loss-suspends-picking
runtime-dispose-clears-hover-and-rejects-input
```

## Required dual-ingress parity rows

```txt
map-canvas-equals-side-panel
window-canvas-equals-side-panel
shelf-gap-canvas-equals-side-panel
wrong-door-canvas-equals-side-panel
class-number-canvas-equals-side-panel
unfinished-photo-canvas-equals-side-panel
bucket-storm-canvas-equals-side-panel
wet-shadow-canvas-equals-side-panel
closet-map-canvas-equals-side-panel
inspection-receipt-parity
clue-receipt-parity
completion-proof-parity
persistence-candidate-parity
story-revision-parity
visible-frame-projection-parity
```

## Required observation rows

```txt
pointer-pick-observation-detached
pointer-pick-observation-json-safe
pointer-pick-observation-has-no-dom-node
pointer-pick-observation-has-no-three-object
pointer-pick-observation-has-no-browser-event
pointer-pick-journal-bounded
journal-hit-row-complete
journal-miss-row-complete
journal-stale-row-complete
```

## Browser matrix

```txt
Chrome current with mouse
Chrome current with touch emulation
Chrome current with pen emulation where available
Firefox current with mouse
Safari current with touch where available
1280x720 DPR 1
1920x1080 DPR 2
3840x2160 DPR 2 under admitted surface policy
activation before first mousemove
activation after resize
activation after scene transition
activation after context restoration
pointer leave and page blur
all nine hotspots through both ingress paths
```

## Browser smoke

```txt
boot and capture session, stage, surface, camera, hotspot-set, context, resource and frame identities
click a hotspot before any mousemove and verify the click position is used
hover hotspot A, resize, click hotspot B and verify B is selected
hover in scene one, Continue, click in scene two and reject predecessor state
activate a hotspot through touch without prior mouse movement
activate a hotspot through pen without prior mouse movement where supported
leave the canvas and verify hover and parallax reset
blur the page and verify hover resets
activate all nine hotspots through canvas and side-panel paths
compare canonical inspection, clue, completion, persistence and visible-frame results
verify misses, stale results and unsupported inputs do not mutate story state
```

## Deployment evidence

```txt
commit SHA
GitHub Pages route URL
browser and input modality
viewport and DPR
session generation
stage epoch
surface revision
camera revision
hotspot-set revision
context generation
resource generation
visible frame id
pointer sample id
pick result id
activation result id
canonical hotspot id
story revision before and after
parity result
bounded observation or artifact reference
```

## Validation claim

This pass documents the proof surface for event-local pointer coordinates, coordinate normalization, revision provenance, stale-pick rejection, input-modality capability, hover cancellation, explicit miss results, canonical hotspot identity, canvas/side-panel parity, detached observations, bounded journals, and visible-frame correlation. It does not claim those runtime authorities or fixtures are implemented.