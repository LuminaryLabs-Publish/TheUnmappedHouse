# Render audit: Interlude Phase and Visible-Frame Gap

**Timestamp:** `2026-07-12T20-51-16-04-00`

## Summary

The visible interlude and Three.js successor scene are projected without a shared progression revision or first-frame receipt.

## Plan ledger

**Goal:** prove that the user sees the interlude, successor or terminal view produced by one committed progression result.

- [x] Trace interlude DOM projection.
- [x] Trace scene replacement and RAF presentation.
- [x] Identify missing provenance.
- [ ] Add visible-frame fixtures.

## Current render path

```txt
completion timer
  -> mutate interlude text/classes/aria-hidden
  -> no render revision
  -> no frame acknowledgement

Continue
  -> mutate currentScene and route
  -> StageKit.loadScene(successor)
  -> next RAF renders successor
  -> no scene-transition result or frame acknowledgement
```

## Gaps

```txt
interlude projection revision: absent
scene phase in render input: absent
route revision in render input: absent
timer lease in interlude projection: absent
first visible interlude frame acknowledgement: absent
first visible successor frame acknowledgement: absent
terminal visible-frame acknowledgement: absent
stale projection rejection: absent
DOM and canvas correlation: absent
```

## Required receipts

```txt
FirstVisibleInterludeFrameAck {
  storyRunGeneration,
  sceneId,
  sceneRevision,
  routeRevision,
  phase: INTERLUDE_OPEN,
  interludeProjectionRevision
}

FirstVisibleSuccessorFrameAck {
  storyRunGeneration,
  predecessorSceneId,
  successorSceneId,
  sceneRevision,
  routeRevision,
  stageResourceRevision,
  phase
}
```

## Proof gate

A transition is not complete when state mutates or `loadScene()` returns. It is complete only after the accepted DOM/canvas generation has produced the first visible frame and stale predecessor projections are retired.
