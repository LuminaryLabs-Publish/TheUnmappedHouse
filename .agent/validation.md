# Validation: The Unmapped House

**Timestamp:** `2026-07-13T01-49-49-04-00`  
**Scope:** documentation-only hotspot input and picking authority audit

## Summary

Source inspection was completed and documentation/registry state was updated. Runtime behavior, input handling, story content, rendering and deployment were not modified or executed.

## Plan ledger

**Goal:** state exactly what this run proves and what remains unverified.

- [x] Verify the current mousemove, click, raycast and camera-parallax paths.
- [x] Verify side-panel controls bypass raycast and dispatch exact descriptors.
- [x] Verify click coordinates are not captured.
- [x] Verify no pointer-leave retirement exists.
- [x] Verify no typed pick or inspection result exists.
- [x] Generate `.agent/kit-registry.json` as valid JSON.
- [x] Change documentation only.
- [ ] Run executable browser pointer/picking fixtures after implementation.

## Source checks performed

```txt
index.html inspected
src/game.js inspected
src/stage-kit.js inspected
src/aspect-frame.js inspected
src/story-data.js inspected
src/styles.css inspected
package.json inspected
existing root .agent state inspected
all nine eligible central ledger entries inspected
all nine eligible root .agent entrypoints confirmed
full LuminaryLabs-Publish repository inventory compared
```

## Source facts established

```txt
this.pointer begins at clip-space 0,0
mousemove is the only path that updates pointer and parallax coordinates
canvas click ignores its event coordinates
clickHotspot() raycasts using cached this.pointer
camera parallax consumes this.mouse during RAF
pick results carry no camera or frame revision
no pointer/touch/stylus event unification exists
no pointerleave or pointercancel handler clears hover
side-panel buttons call inspectHotspot with exact descriptors
canvas and button paths publish no shared command/result envelope
no first-visible inspection-frame acknowledgement exists
```

## Not changed

```txt
runtime JavaScript: no
HTML or CSS: no
story descriptors: no
Three.js rendering: no
browser persistence: no
package scripts: no
dependencies: no
Pages workflow: no
```

## Git policy

```txt
target repository: LuminaryLabs-Publish/TheUnmappedHouse
target branch: main
branch created: no
pull request created: no
```

## Not executed

```txt
npm run check: not run
browser first-click smoke: not run
touch/stylus emulation: not run
pointer-leave smoke: not run
parallax-click correlation fixture: unavailable
canvas/button equivalence fixture: unavailable
GitHub Pages hotspot-input smoke: not run
```

## Required future proof

```txt
first canvas click selects from its own coordinates
touch and stylus activation select from their own event coordinates
stale scene, viewport, canvas and camera revisions reject
hover clears on leave, cancel, scene change and runtime stop
canvas and exact controls produce equivalent inspection results
one command cannot repeat story effects
accepted pick and inspection results cite immutable evidence
visible story and Notebook frames cite the accepted inspection result
local and deployed fixture matrices pass
```

No claim is made that these defects are repaired.