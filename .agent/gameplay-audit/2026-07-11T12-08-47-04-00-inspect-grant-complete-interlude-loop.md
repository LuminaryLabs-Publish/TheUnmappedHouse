# Gameplay audit: Inspect, grant, complete, interlude

Timestamp: `2026-07-11T12-08-47-04-00`

## Goal

Trace the complete player-facing loop and identify where gameplay progression lacks canonical identity, idempotency, and completion proof.

## Current loop

```txt
enter scene
  -> inspect three hotspots in any order
  -> first inspection marks a boolean
  -> descriptor grants one or more global clue strings
  -> notebook receives a row
  -> sceneComplete checks required clue strings
  -> final required clue schedules a 450 ms interlude
  -> Continue advances to the next authored scene
```

## Player-facing strengths

```txt
three concise authored scenes
three readable interactions per scene
button and world-space interaction options
clear clue and notebook feedback
fixed pacing before Continue
simple terminal state after scene three
```

## Progression authority gaps

### Inspection identity

Gameplay has no stable inspection receipt. The player cannot distinguish a new accepted inspection from a re-read except through aggregate UI state.

### Clue ownership

Clues are global strings. Gameplay cannot prove that a clue was earned through the current scene's canonical hotspot rather than loaded, forged, cross-granted, or submitted through a stale descriptor.

### Completion identity

A completed scene has no durable proof object. Completion is recalculated from strings and does not identify the accepted inspections that satisfied it.

### Interlude idempotency

The 450 ms interlude has no proof id or duplicate guard. Progression pacing is therefore not tied to one exactly-once completion event.

### Stale interaction behavior

Because `inspectHotspot()` uses the current scene at callback time, stale interaction work can apply old content to a newer scene's ledger.

## Required gameplay state

```txt
StorySnapshot
  currentSceneId
  storyRevision
  inspectionReceiptsByScene
  clueGrantReceiptsByScene
  completionProofsByScene
  activeCompletionProofId?
  consumedCompletionProofIds
  route
  log
```

## Required gameplay result sequence

```txt
accepted inspection
  -> one receipt
  -> canonical clue grants
  -> story revision advance
  -> optional completion proof
  -> optional interlude lease
  -> committed UI and persistence

duplicate inspection
  -> typed duplicate result
  -> no clue grant
  -> no story revision advance
  -> no second completion proof
  -> optional re-read presentation only
```

## Required fixture rows

```txt
three-canonical-inspections-complete-scene
any-order-inspections-produce-same-proof
repeated-inspection-does-not-regrant
mixed-button-raycast-does-not-double-count
forged-clue-does-not-complete
cross-scene-clue-does-not-complete
completion-proof-created-once
interlude-created-once
continue-consumes-proof-once
stale-old-scene-interaction-does-not-affect-new-scene
```

## Next gameplay ledge

```txt
Canonical inspection receipts
  -> clue provenance
  -> immutable scene completion proof
  -> exactly-once interlude
  -> proof-gated Continue
```
