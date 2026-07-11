# Render audit: invalid-save bootstrap stage/projection gap

Timestamp: `2026-07-11T15-30-50-04-00`

## Summary

The renderer and recursive RAF become live before the loaded StorySnapshot is structurally or semantically admitted. A later UI or persistence exception can therefore leave a visible Three.js stage running without a successfully committed story bootstrap.

## Plan ledger

**Goal:** require one accepted snapshot, one prepared stage, one projected UI candidate, and one acknowledged first frame before startup is reported as committed.

- [x] Trace renderer allocation and RAF start.
- [x] Trace scene load and UI assumptions.
- [x] Trace startup persistence ordering.
- [x] Identify partial-visible-state and leaked-resource paths.
- [x] Define the first-bootstrap-frame proof boundary.
- [ ] Implement detached startup preparation and rollback.

## Current ordering

```txt
load raw state
  -> resolve currentScene
  -> new StageKit()
       -> create renderer and canvas
       -> create render target and post resources
       -> install listeners
       -> start recursive RAF
  -> stage.loadScene(currentScene)
       -> create live geometry, materials and hotspots
  -> renderUi()
       -> assume valid clues, inspected and log shapes
  -> saveState()
       -> untyped localStorage write
```

## Reachable split states

### UI projection fails after rendering starts

A save with `inspected: null`, `clues: null`, or a non-sliceable `log` can fail during `renderUi()`. By that point the stage, canvas, listeners and RAF already exist. The browser can continue rendering a scene while the story module failed to complete initialization.

### Storage write fails after stage and UI become live

`localStorage.setItem()` is called after stage load and UI projection. Security denial or quota failure can throw while the visible stage and recursive RAF remain active, with no committed persistence result or rollback.

### Unknown scene identity splits stage and snapshot

An unknown `state.sceneId` makes `currentScene` fall back to scene one, but the state field remains unknown. The renderer consumes scene one while the saved snapshot can continue naming a nonexistent scene.

### First visible frame has no accepted-snapshot identity

The RAF has no bootstrap generation, StorySnapshot fingerprint, stage epoch, scene revision, load result, or readiness barrier. Nothing proves which loaded state produced the first visible frame.

## Required render transaction

```txt
accepted StorySnapshot candidate
  -> prepare detached stage resources
  -> prepare camera, fog, post settings and hotspot set
  -> prepare DOM/debug projection candidate
  -> validate complete resource inventory
  -> commit story + stage + projection under one bootstrap generation
  -> submit render target pass
  -> submit post-process pass
  -> acknowledge first visible frame
  -> publish committed bootstrap result
```

## Required frame receipt

```txt
BootstrapFrameReceipt
  frameId
  bootstrapGeneration
  loadResultId
  manifestFingerprint
  snapshotFingerprint
  storyRevision
  sceneId
  stageEpoch
  cameraFingerprint
  hotspotSetFingerprint
  postSettingsFingerprint
  renderTargetResult
  postPassResult
  uiProjectionResult
```

## Failure invariant

A failed parse, schema check, semantic check, reconciliation, stage preparation, UI projection, storage write, render submit, or first-frame acknowledgement must leave no candidate canvas, RAF, listener, geometry, material, target, stage group, UI projection, or ready flag live.

## Required fixtures

```txt
invalid-clues-type-rejected-before-renderer-allocation
invalid-inspected-type-rejected-before-renderer-allocation
unknown-scene-does-not-split-stage-and-snapshot
stage-prepare-failure-disposes-candidate-resources
ui-projection-failure-disposes-candidate-resources
storage-write-failure-rolls-back-visible-bootstrap
first-frame-identifies-load-result-and-snapshot
retry-after-failure-creates-one-canvas-and-one-raf
```

## Validation status

No browser fixture currently proves render allocation is delayed until state admission, that startup failure disposes candidate resources, or that the first visible frame matches the accepted StorySnapshot.