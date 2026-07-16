# Render audit: Loading shell to first presented frame gap

**Timestamp:** `2026-07-15T23-00-03-04-00`

## Summary

The public document has a visible pre-render state but no render-readiness protocol. The shell shows `Loading`; Three.js, WebGL resources, scene descriptors, UI projection, and RAF are then created imperatively. No receipt proves that the public canvas has presented the same first scene that the DOM and story runtime consider active.

## Plan ledger

**Goal:** bind the visible stage, DOM story surface, and startup result to one render generation.

- [x] Trace shell, renderer, render target, first-scene load, UI projection, and RAF.
- [x] Identify missing first-frame and fallback acknowledgements.
- [x] Define the render-side contract.
- [ ] Implement failure injection and screenshot/frame fixtures.

## Current render path

```txt
scene title = Loading
  -> external Three.js module resolves
  -> WebGLRenderer is constructed
  -> offscreen target and post material are constructed
  -> scene descriptor creates geometry/materials/hotspots
  -> renderUi replaces Loading
  -> animate schedules RAF and renders stage + post passes
```

## Missing render authority

```txt
RenderGeneration: absent
PreparedFirstSceneRevision: absent
FirstRenderSubmissionResult: absent
FirstPresentedStoryFrameAck: absent
DOM/scene/render convergence receipt: absent
startup fallback frame: absent
shader/link failure result: absent
render-target allocation failure result: absent
first-frame deadline: absent
```

## Failure consequence

A failure before `renderUi()` leaves `Loading`. A failure after DOM projection but before a successful public frame can expose story controls that cite a scene the user cannot see. Neither condition produces a typed terminal result.

## Required render contract

```txt
PreparedStartupFrame
  documentGeneration
  startupAttemptId
  storyRevision
  sceneRevision
  stageRevision
  renderGeneration

FirstPresentedStoryFrameAck
  -> emitted only after stage and post passes complete for the prepared frame
  -> confirms matching DOM and stage revisions

StartupFallbackFrameAck
  -> confirms authored error projection is visible
  -> contains retry availability and failure class
```

## Proof gate

Inject provider rejection, WebGL unavailability, shader failure, render-target failure, scene-construction failure, and first-RAF timeout. Capture DOM state and canvas evidence for source, built artifact, and Pages. No render-readiness claim exists until those fixtures pass.