# Gameplay audit: inspection loop and scene-light projection

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Status:** `audited`

## Summary

The point-and-click loop depends on readable scene composition: the player locates authored hotspots by interpreting geometry, contrast and atmosphere. The current scene-light objects and shadow flags do not control the custom anime material that produces that visible evidence.

## Loop

```txt
enter scene
  -> descriptor creates geometry, lights, materials and hotspot volumes
  -> player scans the rendered stage
  -> player selects a visible feature
  -> raycast or DOM control resolves a hotspot
  -> inspection grants clues and advances completion
```

## Gap

```txt
scene author adjusts DirectionalLight or HemisphereLight
  -> expects hotspot readability and depth cues to change
  -> custom material continues using fixed lightDir
  -> shadow flags do not produce sampled visible shadows
  -> authored lighting intent and gameplay-readable frame can diverge
```

## Required gameplay contract

- Each scene declares one accepted lighting model.
- Hotspot readability is validated against the accepted visible frame.
- Light/shadow revisions bind to the same scene generation as hotspot geometry.
- A lighting change cannot be considered adopted until the matching frame is acknowledged.
- Unused shadow work is rejected or explicitly budgeted.

## Boundary

No hotspot placement, clue logic, story progression or rendering behavior changed.