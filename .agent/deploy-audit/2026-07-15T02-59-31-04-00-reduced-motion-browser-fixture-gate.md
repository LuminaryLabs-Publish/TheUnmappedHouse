# Deploy audit: reduced-motion browser fixture gate

**Timestamp:** `2026-07-15T02-59-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `fixture-gate-defined`

## Summary

The current package command performs syntax checks and the Pages workflow uploads the static repository. Neither path executes browser motion-preference behavior.

## Plan ledger

**Goal:** prevent reduced-motion claims until source, artifact and deployed Pages produce matching profile results and frames.

- [x] Inspect package scripts.
- [x] Inspect Pages workflow.
- [x] Confirm no browser fixture exists.
- [x] Define the fixture matrix.
- [ ] Implement and run the matrix.

## Current proof

```txt
npm run check
  -> node --check only

GitHub Pages
  -> checkout
  -> configure Pages
  -> upload repository
  -> deploy

motion preference browser proof
  -> absent
```

## Required fixture matrix

```txt
desktop full-motion default
desktop system reduced motion
live full -> reduced system change
live reduced -> full system change
explicit reduced override
explicit full override over reduced system
override removal
scene transition in reduced motion
page hide/show and BFCache restore
WebGL context restore under reduced motion
production artifact
deployed Pages origin
```

## Required assertions

```txt
one accepted MotionProfileRevision
all participants report the same revision
no animated parallax in reduced motion
no moving post warp or scan lines in reduced motion
stable stage shader time in reduced motion
interlude transition follows profile
story revision unchanged
FirstMotionMatchedFrameAck observed
source/artifact/Pages parity observed
```
