# Gameplay audit: hidden Continue route-bypass loop

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Status:** `audited`

## Summary

The authored loop requires all three clues in a scene before interlude presentation and route advancement. The route command itself does not enforce that rule.

## Plan ledger

**Goal:** require accepted completion evidence at the scene-advance boundary rather than trusting overlay visibility.

- [x] Trace clue grants, `sceneComplete()`, delayed interlude and `nextScene()`.
- [x] Confirm all three scenes declare three required clues.
- [x] Confirm hidden Continue can be keyboard-focused.
- [x] Confirm `nextScene()` does not call `sceneComplete()`.
- [ ] Add route-bypass rejection and replay fixtures.

## Current loop

```txt
intended
inspect three required hotspots
  -> sceneComplete true
  -> delayed interlude opens
  -> Continue advances

keyboard bypass
page boots with interlude visually hidden
  -> Tab reaches invisible Continue
  -> Enter dispatches click
  -> nextScene advances without completion validation
  -> route and save accept the successor scene
```

## Secondary conflict

While the interlude is open, focus can remain on a background inspection button. Keyboard activation can continue changing predecessor inspection, clues, log and save state behind the modal presentation.

## Required gameplay admission

```txt
InterludeContinueCommand
  -> require active interlude generation
  -> require matching scene-completion receipt
  -> require expected scene and route revisions
  -> reject premature, stale, duplicate or background commands
  -> atomically settle successor scene, route, stage and focus
```

No story or gameplay behavior changed.