# Gameplay audit: provider failure before story reconciliation

**Timestamp:** `2026-07-13T04-47-00-04-00`

## Summary

Story startup is downstream of static StageKit and Three.js imports. Provider rejection therefore prevents state load, scene resolution, StageKit construction, UI projection and initial persistence before the story runtime can return a result.

## Plan ledger

**Goal:** make story boot consume one accepted renderer capability instead of depending on implicit module success.

- [x] Trace state creation and scene resolution.
- [x] Trace StageKit construction before scene load and UI projection.
- [x] Identify the pre-story provider failure path.
- [x] Define zero-mutation requirements for non-accepted provider results.
- [ ] Add executable story-boot gating fixtures.

## Current loop

```txt
module graph accepted
  -> loadState
  -> resolve currentScene
  -> new StageKit
  -> loadScene
  -> renderUi
  -> saveState

module graph rejected
  -> no loadState
  -> no scene resolution
  -> no StageKit
  -> no UI projection
  -> no game-owned result or recovery path
```

## Required gameplay contract

Only `Accepted` or `FallbackAccepted` may allocate a story runtime generation. Every non-accepted provider result must leave story state and browser persistence unchanged, expose a bounded failure projection and permit an explicit retry or exit action.