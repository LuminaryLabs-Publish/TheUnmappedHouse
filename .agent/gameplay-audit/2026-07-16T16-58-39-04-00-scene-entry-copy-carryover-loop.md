# Gameplay audit: scene-entry copy carryover loop

**Timestamp:** `2026-07-16T16-58-39-04-00`

## Summary

Completing a scene leaves the last inspected hotspot text in the story paragraph. Continuing advances gameplay to the next scene without resetting that paragraph, so the player's first narrative instruction for the new room is replaced by stale prior-room copy.

## Plan ledger

**Goal:** make every accepted scene entry start with the intended scene-entry narrative before new inspection gameplay begins.

- [x] Trace completion, interlude and Continue.
- [x] Trace scene text before and after advancement.
- [x] Separate opening copy from inspection copy.
- [x] Define gameplay-facing entry result and proof.
- [ ] Implement and execute the transition fixture.

## Current loop

```txt
inspect final required hotspot
  -> scene-text = final hotspot.text
  -> sceneComplete = true
  -> interlude opens

press Continue
  -> scene identity advances
  -> new room stage and hotspots load
  -> scene-text remains final prior-room hotspot.text

inspect any new hotspot
  -> scene-text finally becomes current-room hotspot.text
```

## Gameplay consequence

The authored `openingText` for scenes two and three is skipped during ordinary uninterrupted progression. Players can enter a new room without receiving its intended setup, even though a reload at that scene can display it because the DOM paragraph starts empty.

## Required policy

```txt
boot entry       -> openingText
scene transition -> openingText
resume/reload    -> explicit resume policy
inspection       -> hotspot text within current scene generation
re-read          -> hotspot text within current scene generation
```

## Acceptance boundary

Do not acknowledge scene-entry gameplay readiness until the current scene title, opening copy, stage and available inspections all share one accepted scene-entry generation.