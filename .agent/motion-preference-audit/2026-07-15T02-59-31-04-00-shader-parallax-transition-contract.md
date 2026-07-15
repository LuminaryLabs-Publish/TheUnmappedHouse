# Motion preference audit: shader, parallax and transition contract

**Timestamp:** `2026-07-15T02-59-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `audited`

## Summary

The current presentation has six motion participants: stage shader drift, post warp, post grain, post scan lines, camera parallax and interlude fade. They need one shared profile contract.

## Plan ledger

**Goal:** define exact participant behavior for full and reduced motion.

- [x] Inventory participants.
- [x] Define safe reduced-motion candidates.
- [x] Define atomic adoption.
- [x] Define lifecycle and replacement behavior.
- [ ] Validate visually and with browser fixtures.

## Participant matrix

| Participant | Full motion | Reduced motion candidate |
|---|---|---|
| Stage material time | advance elapsed time | freeze at a stable deterministic value |
| Post horizontal warp | animate with time | set moving warp contribution to zero |
| Post grain | animate with time | use static or zero grain |
| Post scan lines | animate with time | remove moving scan contribution |
| Camera parallax | follow pointer | hold authored base camera |
| Interlude fade | 550 ms opacity transition | zero or near-zero transition |

## Atomicity

All participant values must be prepared before adoption. A failure must retain the complete predecessor profile; mixed full/reduced frames are not accepted.

## Lifecycle

```txt
boot
  -> resolve profile before first acknowledged frame

system preference change
  -> supersede prior profile generation
  -> adopt replacement once

page restore
  -> revalidate preference source and participant ownership

scene load
  -> apply current profile to newly created materials

retirement
  -> remove media-query listeners and stale receipts
```

## Story safety

Reduced motion must not alter clues, inspection state, route progression, save data, hotspot geometry or terminal outcome.
