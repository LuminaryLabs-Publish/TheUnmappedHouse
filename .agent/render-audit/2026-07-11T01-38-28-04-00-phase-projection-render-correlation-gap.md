# Render audit: phase projection and render correlation gap

Timestamp: `2026-07-11T01-38-28-04-00`

## Current render surface

```txt
StageKit
  -> WebGLRenderer
  -> PerspectiveCamera
  -> scene + stageGroup
  -> WebGLRenderTarget
  -> postScene + post shader
  -> recursive requestAnimationFrame
```

The browser simultaneously projects story state through DOM nodes:

```txt
scene title
scene text
hotspot buttons
notebook/debug JSON
hover label
interlude overlay
Continue button
terminal copy
```

## Gap

The rendered Three.js scene and DOM story phase have no shared committed identity.

```txt
currentScene          = mutable JavaScript reference
StageKit scene         = live resource graph
interlude open state   = DOM class
story completion       = derived clues
save authority         = unversioned localStorage value
render frame identity  = absent
```

A reload can render a completed scene while the interlude remains hidden. A failed Continue save can render the next scene while durable storage still identifies the prior scene. A stale timer can open an overlay without proving it belongs to the rendered scene or save revision.

## Missing render evidence

```txt
sessionId
runtimeEpoch
frameId
storySaveRevision
storyStateFingerprint
storyPhase
sceneId
stageCommitId
stageEpoch
interludeProjectionResult
renderSubmissionResult
canvasCommitResult
```

## Required rendering contract

Every projected frame should consume one immutable committed row:

```txt
CommittedStoryFrame {
  sessionId,
  runtimeEpoch,
  frameId,
  saveRevision,
  stateFingerprint,
  sceneId,
  storyPhase,
  stageCommitId,
  stageEpoch,
  interludeVisible,
  terminalVisible
}
```

DOM and Three.js consumers must either acknowledge the same row or report a typed mismatch/failure. A timer callback must never mutate the DOM directly; it should dispatch a phase command and projection should follow the committed result.

## Retained StageKit risks

- `loadScene()` clears the live committed group before replacement preparation completes.
- Geometry, material and hotspot resources are detached but not disposed.
- `materials` is reset before retired materials are released.
- RAF and listeners are not centrally owned.
- No `dispose()` or stage epoch exists.

## Required proof

```txt
completed-scene-reload-projects-correct-interlude
phase-and-render-scene-identities-match
stale-timer-cannot-open-overlay-on-new-stage
failed-transition-keeps-prior-stage-and-phase
successful-transition-publishes-one-stage-epoch
terminal-reload-projects-terminal-without-stage-divergence
DOM-and-Three-consumption-rows-share-frame-id
```

## Scope guard

Do not change shaders, camera framing, post-process values, scene content or art direction while establishing this contract.
