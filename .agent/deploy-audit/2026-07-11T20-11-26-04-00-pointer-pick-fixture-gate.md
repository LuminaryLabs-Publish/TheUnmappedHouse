# Deploy audit: Pointer-pick fixture gate

Timestamp: `2026-07-11T20-11-26-04-00`

## Summary

The current validation surface syntax-checks source only. Deployment cannot claim correct point-and-click behavior until browser evidence proves event-local coordinates, stale-pick rejection, modality support, dual-ingress parity, and visible-frame correlation.

## Plan ledger

**Goal:** define the minimum pure, browser, and deployed-Page evidence required before canvas hotspot picking is considered reliable.

- [x] Record the current syntax-only boundary.
- [x] Define pure coordinate and revision fixtures.
- [x] Define browser mouse, touch, pen and parity fixtures.
- [x] Define deployed evidence fields.
- [ ] Implement and execute the gate.

## Required local commands

```txt
node scripts/validate-pointer-coordinate-normalization.mjs
node scripts/validate-pointer-pick-revisions.mjs
node scripts/validate-pointer-pick-results.mjs
node scripts/validate-activation-parity.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:pointer-picking
```

## Required pure rows

```txt
event-local-click-coordinate-used
hover-sample-never-authorizes-click
canvas-rect-revision-recorded
stage-epoch-recorded
camera-revision-recorded
hotspot-set-revision-recorded
visible-frame-id-recorded
resize-stale-sample-rejected
scene-change-stale-sample-rejected
context-change-stale-sample-rejected
miss-does-not-mutate-story
hit-resolves-canonical-hotspot-id
side-panel-and-canvas-result-shape-compatible
pointer-pick-observation-detached
pointer-pick-journal-bounded
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
responsive resize before activation
scene transition before activation
context restoration before activation
```

## Required browser smoke

```txt
boot and capture stage, surface, camera, hotspot-set and visible-frame identities
click a hotspot before any mousemove and verify actual click location is used
hover hotspot A, resize, click hotspot B and verify B is selected
hover in scene one, Continue, click in scene two and reject predecessor sample
activate a hotspot through touch without prior mouse movement
activate a hotspot through pen without prior mouse movement where supported
leave canvas and verify hover label clears
blur page and verify hover state clears
activate all nine hotspots through canvas and side-panel paths
compare canonical inspection and clue results for parity
verify every accepted canvas activation cites a visible frame
verify misses and stale results do not mutate story or persistence
```

## Deployment evidence

```txt
commit SHA
Pages URL
browser and input modality
viewport and DPR
stage epoch
surface revision
camera revision
hotspot-set revision
context generation
visible frame id
pointer sample id
pick result id
activation result id
canonical hotspot id
story revision before and after
parity result
bounded observation artifact
```

## Gate

Do not mark pointer picking, touch support, pen support, canvas/side-panel parity, or visible hotspot correctness as validated until every required row has executable evidence.
