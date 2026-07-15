# Render audit: durable save head and visible story frame gap

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Status:** `audited`

## Summary

The DOM and Three.js stage can display a newer or older document-local story revision without exposing whether that revision became the durable save head. A visually correct frame is therefore not evidence of durable progress, and another tab can later replace the save slot without changing the already-visible frame in the active tab.

## Plan ledger

**Goal:** bind durable-save evidence to the accepted story revision without making localStorage or rendering the owner of gameplay truth.

- [x] Trace story mutation to DOM and Three.js projection.
- [x] Trace story mutation to whole-slot localStorage replacement.
- [x] Confirm render projection and durable write have no shared revision identity.
- [x] Define a durable-save frame acknowledgement boundary.
- [ ] Implement and prove visible/durable convergence.

## Current projection

```txt
inspect or route mutation
  -> mutate document-local state
  -> renderUi updates title text controls and Notebook
  -> StageKit may load the next visible scene
  -> saveState replaces localStorage
  -> no save result is returned
  -> no frame records the durable head revision
```

## Missing identities

```txt
StoryRevision
VisibleStoryRevision
DurableSaveRevision
SaveCommitId
SaveWriterId
SaveConflictId
ResetEpoch
FirstDurableStorySaveAck
FirstDurableStorySaveFrameAck
```

## Cross-document mismatch

```txt
tab A visible frame: scene 2 / logical revision A2
durable slot after A: scene 2 / revision A2

tab B stale frame: scene 1 / logical revision B1
tab B writes after a repeated inspection
durable slot becomes B1-derived state

tab A still visibly shows scene 2
next reload restores scene 1
```

The active frame and durable head can disagree without any visible indicator or typed result.

## Required projection descriptor

```txt
DurableStoryProjectionSnapshot {
  visibleStoryRevision
  durableSaveRevision
  pendingCommitId
  writerId
  state: clean | pending | conflicted | read-only | failed
  resetEpoch
  lastAcceptedAt
}
```

## Required acknowledgements

```txt
FirstDurableStorySaveAck
  proves one command reached the durable adapter and was accepted

FirstDurableStorySaveFrameAck
  proves the visible story revision matches the accepted durable head

SaveConflictFrameAck
  proves a stale document did not silently present conflict as durable success
```

## Render policy

- Three.js and DOM continue rendering accepted story state.
- Save status is a separate semantic/debug projection.
- A pending or conflicted save must not rewrite story truth.
- A stale external head must produce an explicit reconcile or read-only result.
- Rendering must never infer persistence success from a completed `renderUi()` call.

## Proof gate

A browser fixture must run two documents against the same origin, advance one, attempt a stale write from the other and capture both the visible story revision and durable head. Source, built artifact and Pages must produce the same result.

## Validation boundary

No renderer, DOM surface, save-status projection or browser fixture changed in this run.