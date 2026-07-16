# Gameplay audit: startup failure leaves no playable interaction loop

**Timestamp:** `2026-07-15T23-00-03-04-00`

## Summary

All authored gameplay depends on startup completing. When the module graph or stage construction fails, no scene, hotspot controls, Notebook state, interlude, reset help, or retry route becomes usable. The static shell can remain present while the interaction loop never begins.

## Plan ledger

**Goal:** make startup failure a recoverable product state rather than an unbounded absence of gameplay.

- [x] Trace the first playable state.
- [x] Identify gameplay services blocked by startup.
- [x] Define failure and retry behavior.
- [ ] Implement and execute browser fixtures.

## Playable loop dependency

```txt
startup ready
  -> current scene resolved
  -> stage visible
  -> inspection buttons projected
  -> canvas hotspot picking active
  -> clues and Notebook can advance
  -> interlude and Continue can progress
```

Current failure loop:

```txt
startup failure
  -> Loading remains or module aborts
  -> no accepted scene revision
  -> no inspection producer is ready
  -> no story command can settle
  -> no retry or alternate route exists
```

## Required gameplay result

`StartupResult` must distinguish pending, ready, recoverable failure, terminal unsupported capability, stale attempt, and retired attempt. Recoverable failures must expose Retry without mutating story state. Unsupported capability must expose a clear reason and preserve any valid save data.

## Preservation rules

- Do not reset or overwrite story state merely because rendering startup failed.
- Do not expose inspection controls before the matching scene and stage are ready.
- Do not accept duplicate retries for the same startup generation.
- Do not allow a late failed attempt to replace a newer ready attempt.
- Do not claim the game is ready until the first matching visible frame is acknowledged.