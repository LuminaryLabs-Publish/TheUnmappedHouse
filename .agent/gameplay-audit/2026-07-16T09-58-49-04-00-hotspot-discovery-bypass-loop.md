# Gameplay audit: hotspot discovery bypass loop

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Status:** `audited`

## Summary

The gameplay loop treats authored membership in `scene.hotspots` as immediate availability. All labels appear in the side panel and all volumes are pickable before any discovery, clue, camera, visibility or narrative condition is evaluated.

## Plan ledger

**Goal:** preserve the current simple loop while defining a reusable authority for future hidden and conditional interactions.

- [x] Trace scene boot, hotspot listing, canvas picking, inspection, clue grants and completion.
- [x] Confirm no discovery or availability state exists.
- [x] Confirm no modal suspension result is shared across DOM and canvas surfaces.
- [ ] Add policy only when content requires conditional interactions.

## Current loop

```txt
scene loaded
  -> all hotspot labels shown
  -> all hotspot volumes pickable
  -> player chooses list or canvas
  -> inspection grants clues
  -> all required clues complete scene
```

## Future failure modes

```txt
hidden narrative hotspot
  -> label reveals it immediately

occluded hotspot
  -> invisible volume remains pickable through visible geometry

clue-gated hotspot
  -> DOM and canvas need independent ad hoc checks

interlude open
  -> underlying hotspot state lacks one typed suspension result

scene transition
  -> previous hover evidence can remain until pointer movement
```

## Authority boundary

Hotspot availability should gate representation and interaction only. Existing inspection, clue, scene-completion and route authorities remain responsible for accepted story outcomes.