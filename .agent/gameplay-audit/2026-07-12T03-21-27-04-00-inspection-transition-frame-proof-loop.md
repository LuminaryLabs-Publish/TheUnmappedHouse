# Inspection and transition frame-proof loop

Timestamp: `2026-07-12T03-21-27-04-00`

## Summary

Gameplay state transitions have no first-visible-frame boundary.

## Plan ledger

**Goal:** keep accepted inspections and scene transitions distinct from the later frame that proves their visual presentation.

- [x] Trace inspection and completion.
- [x] Trace Continue and scene replacement.
- [x] Trace synchronous projection and asynchronous rendering.
- [ ] Add first-frame acknowledgements to accepted results.

## Inspection loop

```txt
hotspot activation
  -> mutate inspected, clues and log
  -> maybe schedule interlude
  -> render notebook/debug
  -> save
  -> no inspection-visible-frame receipt
```

## Transition loop

```txt
Continue
  -> mutate currentScene, sceneId and route
  -> replace StageKit scene resources
  -> render successor DOM/debug
  -> save
  -> no successor-first-frame receipt
```

## Required gameplay contract

Inspection and transition results may commit semantic state before rendering, but presentation status remains pending until a committed frame cites the accepted result and current scene-resource generation.
