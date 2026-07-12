# Frame input, pass result and visible acknowledgement contract

Timestamp: `2026-07-12T03-21-27-04-00`

## Summary

This audit defines the authoritative frame contract for the current stage-target plus post-process renderer.

## Plan ledger

**Goal:** produce one immutable, JSON-safe receipt for every public canvas frame.

- [x] Define frame inputs.
- [x] Define physical pass results.
- [x] Define commit and visibility rules.
- [x] Define diagnostic readback.
- [ ] Implement and validate.

## Frame input

```txt
frameId
previousCommittedFrameId
runtimeSessionId
runtimeGeneration
lifecycleRevision
manifestId
storySnapshotId
storyRevision
narrativeRevision
sceneId
sceneResourceGeneration
surfaceId
surfaceRevision
contextGeneration
cameraRevision
hotspotSetRevision
wallTime
```

## Stage pass result

```txt
passId
frameId
targetId
accepted input fingerprint
submitted scene/camera identity
success or failure
```

## Post pass result

```txt
passId
frameId
source target id
default framebuffer identity
success or failure
```

## Commit rule

A frame commits only when both pass results succeed and the final canvas presentation is acknowledged for the same frame id. Failed or stale frames remain observable but cannot replace public readback.

## Public observation

```txt
latest committed frame
latest rejected/failed frame
bounded journal
detached frame input summary
pass result summaries
visible acknowledgement
correlated story/narrative revisions
```
