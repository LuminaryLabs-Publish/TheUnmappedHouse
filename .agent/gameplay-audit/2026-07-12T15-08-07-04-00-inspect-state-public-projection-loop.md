# Gameplay audit: Inspect State Public Projection Loop

**Timestamp:** `2026-07-12T15-08-07-04-00`

## Summary

Every inspection mutates canonical progress and immediately republishes internal aggregate fields into the player Notebook. The gameplay event and diagnostic projection are coupled with no channel or field policy.

## Plan ledger

**Goal:** make inspection commit one gameplay result, then derive player and diagnostic projections independently.

- [x] Trace first inspection, re-read, completion and Continue paths.
- [x] Identify state fields changed by each path.
- [x] Identify fields projected publicly.
- [x] Define the required separation.
- [ ] Implement independent projections.

## Current loop

```txt
inspect hotspot
  -> inspect current-scene id
  -> grant clue ids
  -> write narrative log
  -> derive completion
  -> schedule interlude when complete
  -> rebuild hotspot controls
  -> serialize internal state into Notebook
  -> save
```

The re-read path also republishes the full internal projection even though only narrative text and log change.

## Gameplay coupling

The current Notebook exposes exact implementation state rather than a player-facing interpretation:

```txt
player meaning: "A pencil line appears without touching the page."
internal diagnostic: "clue:blank-square"

player meaning: scene discoveries are complete
internal diagnostic: complete: true
```

Both are valid outputs, but they require separate models and audiences.

## Required sequence

```txt
InspectionCommand
  -> InspectionResult
  -> StoryStateCommit
  -> PlayerNotebookProjectionCommand
  -> optional DeveloperDiagnosticProjectionCommand
  -> independent projection results
  -> visible acknowledgements
```

## Required invariants

```txt
inspection success does not imply diagnostic publication
player notebook never depends on raw aggregate field names
public player channel cannot include developer-only fields
re-read does not duplicate progress receipts
scene completion uses one committed proof
player and diagnostic projection failures do not roll back gameplay
stale projection cannot overwrite newer story state
```

## Gate

Gameplay progression is not cleanly separated until inspection and completion results can be projected to the player without exposing or depending on the raw diagnostic object shape.