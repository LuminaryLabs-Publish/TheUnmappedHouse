# Gameplay audit: Presentation loss and interaction liveness

**Timestamp:** `2026-07-14T01-00-28-04-00`  
**Status:** `audited`

## Summary

Story truth and DOM controls remain live independently from WebGL presentation readiness. During context loss, inspection buttons can still grant clues, write Notebook entries, schedule interludes and persist state even though the visible stage may be unavailable or stale.

## Plan ledger

**Goal:** preserve story-state liveness while preventing stage-dependent commands from settling against an unavailable or unverified scene presentation.

- [x] Trace DOM and canvas hotspot command paths.
- [x] Trace story mutation and persistence after inspection.
- [x] Identify the missing presentation-readiness gate.
- [x] Define safe and unsafe commands during recovery.
- [ ] Implement and verify the gate.

## Current command paths

```txt
canvas hotspot
  -> pointer raycast
  -> StageKit onHotspot callback
  -> inspectHotspot
  -> mutate inspected, clues and log
  -> completion/interlude
  -> save

DOM hotspot button
  -> inspectHotspot directly
  -> same mutation and save path
```

## Context-loss divergence

```txt
presentation unavailable or unverified
  -> DOM buttons remain enabled
  -> canvas listener and recursive RAF remain application-owned
  -> no presentation-readiness state reaches game.js
  -> story mutation and persistence continue
  -> Notebook can advance beyond the last proven visible stage frame
```

## Command classification

Safe while presentation is lost:

```txt
read current story status
read recovery diagnostics
reset only through the existing persistence authority
page lifecycle cleanup
```

Must be suspended until recovery proof:

```txt
canvas hotspot inspection
DOM hotspot inspection
scene continue
commands that depend on current stage spatial truth
commands that would persist new scene-dependent progress
```

## Required gameplay envelope

```txt
StageInteractionLease
  storyRevision
  sceneId
  sceneDescriptorRevision
  contextGeneration
  stageResourceGeneration
  firstVisibleFrameSequence
  admittedCommands
  status: Active | Suspended | Retired
```

## Recovery rule

Story truth should not be rolled back merely because rendering fails. Instead, the last accepted story revision remains authoritative, new stage-dependent commands are suspended, a DOM fallback explains the state, and interaction resumes only after the first recovered frame cites the same scene and story revision.

## Required fixtures

```txt
loss before first inspection
loss after one clue
loss after final clue before interlude
loss while interlude is open
DOM inspection attempted during loss
canvas inspection attempted during loss
continue attempted during loss
recovery to same scene
scene change requested while restoring
recovery failure and persistent fallback
first command after recovered-frame acknowledgement
```

## Completion boundary

Do not claim gameplay continuity merely because story state remains mutable. Completion requires an explicit interaction lease that keeps story truth stable while blocking commands whose semantics depend on an accepted visible stage.