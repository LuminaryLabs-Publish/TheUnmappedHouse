# Gameplay audit: load, inspect, save and reload loop

Timestamp: `2026-07-11T08-11-14-04-00`

## Current loop

```txt
load raw save
  -> shallow merge
  -> resolve current scene with silent fallback
  -> inspect hotspot
  -> mark id and grant raw clue strings
  -> derive completion
  -> save mutable state
  -> reload
```

## Gameplay integrity findings

### Active and persisted scene can diverge

When a saved `sceneId` is unknown, runtime presentation falls back to the first scene. The invalid id remains in `state.sceneId` and is immediately written back. The player sees one scene while durable state claims another.

### Completion can be forged by persisted clues

`sceneComplete()` checks only whether every required clue string exists in `state.clues`. A save can include those strings without any canonical hotspot inspection, receipt or scene ownership proof.

### Inspections and clues can contradict each other

The raw save may contain:

```txt
inspection with no granted clue
clue with no inspection
hotspot under the wrong scene
unknown hotspot id
future-scene clue in the current scene
```

No reconciliation reconstructs one authoritative interpretation.

### Reload loses phase meaning

Completion, pending interlude, open interlude, transitioning and terminal status are not persisted. Reload can restore clues that imply completion while showing no interlude and accepting further inspection input.

### Malformed fields fail after admission

A parsed payload can pass load and then fail only when later gameplay calls array methods on `clues`, `route` or `log`.

## Required canonical gameplay loop

```txt
admit StoryManifest
  -> load and classify save
  -> migrate supported legacy shape
  -> reconcile ids and provenance
  -> commit canonical StorySnapshot
  -> render admitted active scene
  -> accept typed inspection commands
  -> derive receipts, clues and completion
  -> write typed versioned save result
  -> reload to the same state fingerprint and phase
```

## Required gameplay fixtures

```txt
unknown-scene-save-enters-canonical-scene-and-corrects-persistence
forged-clues-do-not-complete-scene
valid-inspections-reconstruct-required-clues
cross-scene-inspection-does-not-survive-reconciliation
reload-after-first-inspection-preserves-one-receipt
reload-after-completion-restores-completion-phase
legacy-v1-save-migrates-without-copy-or-pacing-change
```

## Scope boundary

This audit does not change story content, hotspot count, required clue count, 450 ms interlude pacing, camera, shaders or visual composition.
