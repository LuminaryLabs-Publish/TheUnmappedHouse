# Gameplay audit: hidden Continue scene-skip loop

**Timestamp:** `2026-07-12T06-30-34-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

A keyboard-only path can advance scenes without collecting the authored clues because hidden Continue remains active and `nextScene()` has no completion admission guard.

## Plan ledger

**Goal:** describe the exact player loop and the gameplay proof required to prevent unearned scene progression.

- [x] Trace scene completion and interlude opening.
- [x] Trace hidden native focus and button activation.
- [x] Trace successor state mutation and persistence.
- [x] Define scene-skip fixtures.
- [ ] Implement command admission.

## Intended loop

```txt
inspect three authored hotspots
  -> receive required clues
  -> derive scene completion
  -> show interlude
  -> activate Continue
  -> enter successor scene
```

## Reachable bypass loop

```txt
enter fresh scene
  -> collect zero clues
  -> Tab to hidden Continue
  -> press Enter or Space
  -> nextScene() selects successor
  -> state.sceneId and route advance
  -> stage loads successor
  -> saveState() persists skipped progression
```

Repeating the path can reach the terminal copy without proving any authored inspection sequence.

## Missing gameplay authority

```txt
SceneCompletionProof identity
Continue capability derived from proof
proof-to-current-scene binding
modal-generation binding
single-use proof consumption
stale and duplicate rejection
typed progression result
```

## Required gameplay fixtures

```txt
zero-clue-continue-rejected
partial-clue-continue-rejected
complete-scene-open-interlude-accepted
complete-scene-continue-accepted-once
duplicate-continue-no-second-transition
stale-scene-proof-rejected
terminal-cannot-be-reached-without-three-scene-proof-chain
```

## Validation boundary

The source path is documented, not executed. No runtime scene-skip or completion-chain fixture exists.
