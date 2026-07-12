# Command, result and frame admission map

Timestamp: `2026-07-12T03-21-27-04-00`

## Summary

Canvas clicks and side-panel buttons can cause semantic mutations, but no accepted command/result is correlated with a later visible frame.

## Plan ledger

**Goal:** connect input evidence, semantic results and frame evidence without allowing stale rendering to imply current state.

- [x] Trace canvas hotspot dispatch.
- [x] Trace side-panel hotspot dispatch.
- [x] Trace Continue dispatch.
- [x] Trace renderer submission.
- [ ] Add typed command/result/frame correlation.

## Required map

```txt
PointerSample or SidePanelActivation
  -> InspectionCommand
  -> InspectionResult
  -> story revision

ContinueActivation
  -> SceneTransitionCommand
  -> SceneTransitionResult
  -> story and scene-resource revisions

RenderFrameCommand
  -> FrameInputSnapshot cites accepted result/revisions
  -> FrameCommitResult
  -> VisibleFrameAcknowledgement
```

## Admission rule

A frame based on predecessor story, resource, surface or context generations is stale. It may be observed as rejected, but cannot become the public latest committed frame.
