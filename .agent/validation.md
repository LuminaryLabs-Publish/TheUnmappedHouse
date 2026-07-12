# Validation: The Unmapped House

Timestamp: `2026-07-12T03-21-27-04-00`

## Summary

This was a documentation-only Committed Frame Diagnostics audit. Runtime, gameplay, rendering, dependencies, package scripts and deployment configuration were not changed.

## Plan ledger

**Goal:** define executable evidence that proves story, notebook/debug state and the visible two-pass canvas cite one committed frame.

- [x] Record the current syntax-only validation boundary.
- [x] Define frame identity, immutable input, stage-pass, post-pass, visible-ack and correlation fixture rows.
- [x] Define a deployed browser screenshot-correlation sequence.
- [x] Update `.agent/kit-registry.json` with the implemented and proposed kit inventory.
- [x] Push repo-local documentation to `main`.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement and execute the validation gate.

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
browser smoke: not run
committed-frame fixture: unavailable
stage/post pass fixture: unavailable
story/canvas parity fixture: unavailable
screenshot correlation fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: complete
central internal change log: complete
```

## Available validation

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not create a WebGL renderer, submit frames, freeze frame inputs, inspect pass results, capture screenshots or compare story/debug state with the visible canvas.

## Required commands

```txt
node scripts/validate-frame-contract.mjs
node scripts/validate-stage-post-results.mjs
node scripts/validate-story-frame-parity.mjs
node scripts/validate-stale-frame-rejection.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:frames
```

## Required fixture rows

### Frame admission and identity

```txt
frame-command-requires-runtime-generation
frame-command-requires-scene-resource-generation
frame-command-requires-surface-revision
frame-command-requires-context-generation
frame-sequence-monotonic
duplicate-frame-id-rejected
stale-frame-generation-rejected
```

### Immutable input

```txt
frame-input-frozen
story-revision-required
narrative-revision-required
camera-revision-required
hotspot-set-revision-required
wall-time-sample-recorded
live-mutation-cannot-change-inflight-input
```

### Pass results

```txt
stage-pass-result-required
stage-pass-target-identity-recorded
post-pass-result-required
default-framebuffer-result-recorded
failed-stage-pass-not-committed
failed-post-pass-not-committed
```

### Visible acknowledgement and parity

```txt
visible-frame-ack-required
first-frame-after-start
first-frame-after-inspection
first-frame-after-scene-transition
debug-readback-cites-committed-frame
notebook-story-canvas-revision-parity
screenshot-cites-frame-id
screenshot-cites-commit-sha
```

### Observation

```txt
frame-observation-detached-json-safe
frame-journal-bounded
failed-frame-observable
stale-frame-observable
latest-committed-frame-stable
```

## Browser smoke

```txt
open deployed route
record initial frame receipt and screenshot
inspect a hotspot
verify notebook does not claim visible parity until frame acknowledgement
record first frame citing the inspection result
complete the current scene and Continue
record first frame citing successor story and scene-resource revisions
compare DOM, debug JSON, canvas screenshot and frame receipt
submit or simulate a stale frame and verify rejection
```

## Deployment evidence

```txt
commit SHA
GitHub Pages route URL
browser and viewport
runtime session id and generation
story and narrative revisions
scene-resource generation
surface revision
context generation
frame id
stage-pass result id
post-pass result id
visible-frame acknowledgement id
debug observation
screenshot artifact reference
fixture artifact reference
```

## Validation claim

The proof surface is documented but not implemented. Do not claim that notebook/debug state matches the visible canvas until the committed-frame fixture gate passes.
