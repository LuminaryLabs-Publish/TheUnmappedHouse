# Gameplay audit: silent inspection, interlude and terminal loop

**Timestamp:** `2026-07-15T12-59-24-04-00`

## Summary

The complete prototype can be traversed through visible text and controls, but accepted inspections, clue grants, scene completion, interludes and terminal completion produce no owned semantic audio result.

## Plan ledger

**Goal:** map every meaningful story transition to an explicit audio policy while preserving story truth and allowing authored silence.

- [x] Trace first and repeated inspections.
- [x] Trace clue grants and scene completion.
- [x] Trace interlude and terminal progression.
- [x] Confirm no cue or ambience owner exists.
- [ ] Implement result-driven cues and browser fixtures.

## Current loop

```txt
inspect hotspot
  -> accept inspection
  -> maybe grant clue
  -> update text and Notebook
  -> maybe schedule interlude
  -> persist state
  -> silence by absence

continue interlude
  -> advance scene or show terminal copy
  -> load next visible stage when available
  -> silence by absence
```

## Required semantic events

```txt
InspectionAccepted
InspectionRepeated
ClueGranted
SceneCompleted
InterludeOpened
InterludeContinued
SceneEntered
PrototypeCompleted
ResetAccepted
```

Each event needs a stable event ID and story revision so replayed projection cannot duplicate one-shot cues. Ambience must be scene-owned and retire when the scene, document or audio generation is replaced.

## Boundary

Audio cues remain presentation. They cannot grant clues, advance routes, mutate saves or determine completion.