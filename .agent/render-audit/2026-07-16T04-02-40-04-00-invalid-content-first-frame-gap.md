# Render audit: invalid content and first validated story frame

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-content-graph-validation-authority-audited`

## Summary

StageKit assumes valid camera, stage, material, hotspot, and post descriptors. It can begin constructing GPU resources before any semantic content result exists. There is no proof that the visible frame corresponds to an accepted story revision.

## Plan ledger

**Goal:** prevent invalid authored descriptors from producing a partial, stale, or unacknowledged public frame.

- [x] Trace descriptor consumption in `StageKit.loadScene`.
- [x] Identify direct tuple spreads and numeric assignments.
- [x] Confirm no renderer-side content revision or validation result exists.
- [x] Define a pre-render adoption gate and first validated frame acknowledgement.
- [ ] Implement and inject invalid descriptor fixtures.

## Current render path

```txt
currentScene
  -> StageKit.loadScene(sceneData)
  -> background and fog
  -> camera vectors and FOV
  -> layers and props
  -> hotspot volumes
  -> post-process uniforms
  -> RAF stage pass and post pass
```

## Gap

The consumer directly assumes:

```txt
camera.position and camera.lookAt are three-value iterables
stage.layers and stage.props are usable collections
layer.size and layer.position have valid dimensions
prop kind and geometry fields are supported
material colors contain usable color values
hotspot size and position are valid
post values are finite and in an authored range
```

A malformed content revision can throw during construction or present a frame whose semantic story graph was never accepted.

## Required render contract

```txt
accepted StoryContentValidationResult
  -> immutable normalized descriptor index
  -> StoryContentAdoptionResult
  -> StageKit preparation for the matching ContentRevision
  -> first stage/post presentation
  -> FirstValidatedStoryFrameAck
```

Rejected content must remain in a shell-owned semantic fallback and must not create scene geometry, hotspot volumes, or interactive controls.

## Proof boundary

No malformed descriptor was injected and no browser frame was captured. The current descriptors appear usable by inspection.
