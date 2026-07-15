# Gameplay audit: motion-sensitive story loop

**Timestamp:** `2026-07-15T02-59-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `audited`

## Summary

Story progression itself is discrete, but the player must experience it through continuously animated shader, post-process and camera presentation with no reduced-motion alternative.

## Plan ledger

**Goal:** keep inspection, clue and route semantics identical across motion profiles.

- [x] Trace boot, inspection, completion and route loops.
- [x] Separate story truth from presentation motion.
- [x] Define invariant gameplay behavior.
- [ ] Implement and compare full/reduced profiles.

## Gameplay invariants

```txt
same scene order
same hotspot availability
same clue grants
same completion predicates
same interlude content
same persistence state
same route and terminal behavior
same DOM and raycast actions
```

## Presentation variance allowed

```txt
stage material time drift
post-process warp
post-process moving grain
post-process scan-line movement
camera parallax
interlude transition duration
```

## Main gap

No accepted policy distinguishes semantic gameplay truth from optional motion presentation. A future reduced-motion profile must change presentation only and publish evidence that the current story revision remains unchanged.
