# Gameplay audit: unsatisfiable story route loop

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-content-graph-validation-authority-audited`

## Summary

Gameplay progression depends entirely on authored IDs and clue strings. There is no preflight proof that each scene can be completed and that the ordered route reaches one terminal result.

## Plan ledger

**Goal:** prove that every accepted story revision supports the complete inspect, complete, Continue, and terminal loop.

- [x] Trace clue grant and completion evaluation.
- [x] Trace scene advancement by array position.
- [x] Identify duplicate-ID and ungrantable-clue failure modes.
- [x] Define route and completion satisfiability results.
- [ ] Implement and test invalid graph fixtures.

## Current progression

```txt
inspect hotspot
  -> mark inspected[sceneId][hotspotId]
  -> append hotspot.grants clues
  -> require every scene.requiresToComplete clue
  -> show interlude
  -> Continue to scenes[currentIndex + 1]
  -> terminal when next entry is absent
```

## Source-derived failure paths

### Ungrantable completion clue

```txt
requiresToComplete contains clue:X
  -> no reachable hotspot grants clue:X
  -> sceneComplete remains false
  -> interlude never opens
  -> route is permanently blocked
```

### Duplicate hotspot identity

```txt
two hotspots share one ID
  -> both map to one inspected ledger key
  -> one inspection can mark the other as completed
  -> authored observations and visible checkmarks diverge
```

### Duplicate scene identity

```txt
two scenes share one ID
  -> saved scene lookup selects the first match
  -> inspected state aliases both scenes
  -> findIndex and route entries become ambiguous
```

### Invalid route order

```txt
scene array is empty or reordered incorrectly
  -> initial state or Continue assumptions fail
  -> no explicit route validation result explains the failure
```

## Required gameplay result

Every accepted content revision must publish:

```txt
initial scene exists
all scene IDs are unique
all hotspot IDs are unique within their scene
all required clues are grantable on a reachable path
all scenes are reachable in authored order
one terminal boundary exists
```

The current three-scene route appears satisfiable by manual inspection. No gameplay soft-lock was reproduced.
