# Deploy audit: hotspot input fixture gate

**Timestamp:** `2026-07-13T01-49-49-04-00`

## Summary

The current `npm run check` performs syntax validation only. It cannot instantiate a browser canvas, dispatch pointer events, drive camera parallax, raycast hotspot volumes or prove that deployed Pages behavior matches the source contract.

## Plan ledger

**Goal:** define the executable browser and deployment evidence required before claiming reliable canvas hotspot interaction.

- [x] Inspect the current package check surface.
- [x] Identify missing browser capabilities.
- [x] Define source, built/deployed and device-class fixture rows.
- [x] Define acceptance evidence.
- [ ] Implement and run the gate.

## Current proof surface

```txt
npm run check
  -> node --check src/aspect-frame.js
  -> node --check src/game.js
  -> node --check src/stage-kit.js
  -> node --check src/story-data.js
```

This proves parseability only.

## Required local browser matrix

```txt
mouse first click without prior move
mouse move then click at same coordinates
mouse move then click elsewhere without another move
touch tap with no mousemove
stylus tap
pointer leave clears hover
resize invalidates predecessor samples
scene change invalidates predecessor samples
camera parallax click correlation
canvas miss result
canvas and side-panel target equivalence
duplicate command replay
```

## Required device/viewport matrix

```txt
desktop mouse at 16:9
wide desktop with letterboxing
narrow mobile viewport
mobile touch emulation
high-DPR viewport
DPR transition or zoom
reduced frame-rate/throttled RAF
```

## Required Pages matrix

```txt
load deployed index and pinned Three.js module
wait for first presented stage frame
run mouse, touch-emulation and pointer-leave rows
verify exact hotspot IDs and terminal result statuses
verify no stale target after resize or scene transition
capture visible inspection result and frame acknowledgement
record deployment commit SHA and test timestamp
```

## Required artifacts

```txt
fixture manifest
browser/version and device profile
source and deployment commit SHA
command/result transcript
pointer and camera revision transcript
selected hotspot evidence
screenshots or frame captures
pass/fail summary
failure logs
```

## Release gate

Do not claim canvas hotspot reliability, touch readiness or deployment parity until the same authoritative fixture rows pass against local source and the deployed Pages revision.