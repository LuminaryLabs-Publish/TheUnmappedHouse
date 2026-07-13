# Gameplay audit: canvas and button inspection loop

**Timestamp:** `2026-07-13T01-49-49-04-00`

## Summary

The game exposes two inspection surfaces with different authority. Side-panel buttons carry an exact hotspot descriptor. Canvas clicks infer a hotspot from cached pointer state and mutable camera state. Both paths call `inspectHotspot()` directly, so the story layer cannot distinguish their evidence, reject stale picks or prove that the target matched the player's input.

## Plan ledger

**Goal:** route every inspection source through one exact, idempotent and evidence-bearing gameplay command.

- [x] Trace canvas and button input paths.
- [x] Compare their target identity and evidence.
- [x] Identify duplicate and stale-command gaps.
- [x] Define shared gameplay result requirements.
- [ ] Implement and execute source-equivalence fixtures.

## Current loops

### Canvas

```txt
canvas click
  -> clickHotspot()
  -> pick() from cached pointer and camera
  -> hotspot descriptor or null
  -> inspectHotspot(hotspot)
  -> mutate inspected/clues/log
  -> maybe schedule interlude
  -> render UI
  -> save
```

### Side panel

```txt
button click
  -> closure already holds exact hotspot descriptor
  -> inspectHotspot(hotspot)
  -> mutate inspected/clues/log
  -> maybe schedule interlude
  -> render UI
  -> save
```

## Gameplay risks

### Target mismatch

A canvas click can inspect a hotspot different from the click location because the click event coordinates are not captured.

### Source divergence

The exact-button path and inferred-canvas path produce no shared command envelope or source-specific evidence. Diagnostics cannot establish whether a result came from a valid pick or direct exact selection.

### Stale scene or hotspot set

No command carries scene or hotspot-set revision. An event delivered around scene replacement has no explicit rejection rule, even though the active hotspot array and stage graph are mutable.

### Duplicate command ambiguity

No inspection command ID or result ID exists. Rapid activation from canvas and button surfaces can create multiple calls. Clue grants are manually idempotent, but re-read logs, persistence writes and future side effects are not governed by an exactly-once result.

### Result-to-frame gap

The visible story text and Notebook do not expose an inspection result ID, input source, pick evidence or frame acknowledgement.

## Required shared command

```txt
HotspotInspectionCommand
  commandId
  runtimeSessionId
  storyRunId
  sceneRevision
  hotspotSetRevision
  source: canvas | side-panel | accessibility
  requestedHotspotId
  pickResultId or null
  expectedStoryRevision
```

## Required result

```txt
HotspotInspectionResult
  commandId
  accepted
  status
  source
  sceneRevision
  hotspotId
  firstInspection
  grantedClues
  storyRevision
  saveCandidateRevision
  pickEvidence or exact-selection evidence
```

## Invariants

```txt
unknown hotspot IDs fail closed
canvas commands require an accepted pick result
side-panel commands require an exact active descriptor
stale scene or hotspot-set revisions reject
one command produces one terminal result
accepted duplicates return the prior result without repeating effects
all sources use the same story reducer and result projection
```

## Proof boundary

No inspection behavior changed. The current clue idempotence does not prove command idempotence, source equivalence or target correctness.