# Interaction audit: Scene Load, Retire and Commit Result Map

**Timestamp:** `2026-07-12T19-11-01-04-00`

## Summary

Continue is the only normal scene-load ingress, but no command or result identity links the button activation to resource preparation, visible commit and predecessor retirement.

## Plan ledger

**Goal:** map one interaction from user activation to terminal lifecycle evidence.

- [x] Trace Continue activation.
- [x] Trace StageKit mutation and render.
- [x] Define command and result surfaces.
- [ ] Implement interaction-to-frame correlation.

## Required map

```txt
Continue activation
  -> ContinueCommand(commandId, expectedSceneId, expectedStoryRevision)
  -> SceneTransitionPlan
  -> LoadSceneCommand(stageSessionId, expectedResourceRevision, nextSceneId)
  -> SceneResourcePreparedResult
  -> SceneResourceCommitResult
  -> FirstVisibleSceneFrameAck
  -> SceneResourceRetirementResult
  -> ContinueResult
```

## Rejection rows

```txt
duplicate command
stale current scene
stale resource revision
invalid descriptor
candidate allocation failure
first-frame failure
stage already stopped
terminal scene has no successor
```

Every row requires one detached terminal result and zero undeclared partial mutation.