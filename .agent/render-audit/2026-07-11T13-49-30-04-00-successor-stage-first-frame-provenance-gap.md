# Render audit: successor stage first-frame provenance gap

Timestamp: `2026-07-11T13-49-30-04-00`

## Goal

Require proof that one committed successor story revision and stage epoch produced the first visible frame before predecessor resources are retired.

## Current behavior

`StageKit.loadScene()` mutates the active scene immediately. It clears the live group, builds layers, props, materials, and hotspots in place, changes camera/fog/post settings, and returns no receipt. The independent recursive RAF renders the next available mutable state.

## Missing provenance

```txt
transitionId
storyRevision
stageEpoch
resourceInventoryId
cameraRevision
hotspotSetRevision
postRevision
frameId
firstVisibleSuccessorFrame
consumerAcknowledgement
predecessorRetirementReceipt
```

## Risk

A failed or partial stage build can still be rendered. Story and stage can diverge. Predecessor allocations can be detached without a successor-frame proof, while geometry and materials are not disposed.

## Required contract

The first successor frame must identify the transition, story revision, stage epoch, camera, fog, hotspot set, material/post policy, and resource inventory. Predecessor retirement must occur only after this frame is acknowledged.