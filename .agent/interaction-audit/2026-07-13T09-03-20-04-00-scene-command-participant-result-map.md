# Interaction audit: scene command to participant result map

**Timestamp:** `2026-07-13T09-03-20-04-00`

## Summary

The Continue button currently invokes `nextScene()` directly. There is no command envelope connecting user intent to story, stage, UI and persistence receipts.

## Plan ledger

**Goal:** map one user action to one admitted command, one coherent participant set and one terminal result.

- [x] Identify the Continue source.
- [x] Identify every downstream participant.
- [x] Identify missing admission and receipt boundaries.
- [ ] Implement command and result routing.

## Current map

```txt
click Continue
  -> nextScene()
  -> mutate story aggregate
  -> mutate interlude DOM
  -> mutate stage resources
  -> mutate UI DOM
  -> mutate localStorage
  -> no terminal result
```

## Required map

```txt
ContinueIntent
  -> SceneTransitionCommand
  -> route/completion admission
  -> descriptor validation
  -> StoryParticipantReceipt
  -> StageParticipantReceipt
  -> InterludeParticipantReceipt
  -> UiParticipantReceipt
  -> SaveParticipantReceipt
  -> SceneTransitionResult
  -> FirstSceneFrameAck
```

## Admission checks

```txt
current session generation
expected predecessor scene
expected participant revisions
scene is complete
interlude phase permits Continue
authored successor is valid or terminal
command is not stale or duplicate
```

## Zero-mutation rejection

Invalid route, incomplete scene, stale predecessor, duplicate command, malformed descriptor or failed participant preparation must not change story, stage, modal, UI or save state.

## Observation

Public diagnostics should expose bounded recent transition results and the last coherent visible scene envelope, not raw mutable participant objects.