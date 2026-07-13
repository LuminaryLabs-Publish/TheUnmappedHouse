# START HERE: The Unmapped House Hotspot Input and Picking Authority

Last updated: `2026-07-13T01-49-49-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, local browser persistence, a fixed 16:9 shell and a descriptor-driven Three.js stage.

The current audit isolates canvas hotspot input and raycast admission. Canvas activation ignores the click event coordinates and raycasts using the last `mousemove` sample, or the default center sample before any movement. Touch/stylus activation can therefore inspect the wrong hotspot. Pointer-driven camera parallax is applied on RAF, so a quick click can also combine a new pointer sample with an older camera pose. No pointer, viewport, camera, hit-result or visible-frame identity connects the user's action to the accepted inspection.

## Plan ledger

**Goal:** make every canvas or exact-control inspection one source-identified, revision-bound and frame-correlated hotspot command.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse`, the oldest eligible central entry.
- [x] Trace pointer sampling, hover, click, camera parallax, raycast, exact buttons and inspection mutation.
- [x] Identify the complete interaction loop, active domains, all 24 implemented kits and every offered service.
- [x] Define event-coordinate, source, viewport, camera, hit-result and visible-frame contracts.
- [x] Add a timestamped tracker and architecture/system audit family.
- [x] Refresh all required root `.agent` files and the machine registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable pointer/picking fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

TheUnmappedHouse   2026-07-12T23-20-51-04-00 selected
AetherVale         2026-07-12T23-40-11-04-00
TheOpenAbove       2026-07-13T00-00-02-04-00
IntoTheMeadow      2026-07-13T00-18-48-04-00
PhantomCommand     2026-07-13T00-40-00-04-00
PrehistoricRush    2026-07-13T00-58-50-04-00
HorrorCorridor     2026-07-13T01-08-28-04-00
ZombieOrchard      2026-07-13T01-18-20-04-00
MyCozyIsland       2026-07-13T01-40-00-04-00
TheCavalryOfRome   excluded
```

## Active input loop

```txt
mousemove
  -> update cached pointer and parallax state
  -> raycast hover
  -> update hover label

RAF
  -> consume parallax state
  -> mutate camera
  -> render stage and post pass

canvas click
  -> discard click coordinates
  -> raycast with cached pointer and mutable camera
  -> dispatch first intersected hotspot

side-panel click
  -> bypass picking
  -> dispatch exact hotspot descriptor
```

## Main findings

1. A first canvas click can raycast at clip-space center because `this.pointer` begins at `0,0`.
2. Later canvas clicks can use a stale mouse location because the click event coordinates are ignored.
3. Touch and stylus activation are not sampled through a pointer-event path, so compatibility clicks can reuse default or stale coordinates.
4. A click before the next RAF can pair a new pointer sample with the previous camera pose.
5. No pointer-leave handler clears hover state or the hover label.
6. Canvas and side-panel inspection do not share one typed command/result contract.
7. No visible frame acknowledges the accepted hotspot result.

## Required authority

```txt
the-unmapped-house-hotspot-input-picking-authority-domain
```

It must own input source and command identity, event-bound coordinates, viewport/canvas-rect revision, camera and rendered-frame revision, hotspot-set revision, deterministic hit selection, stale/duplicate rejection, hover retirement, source-equivalent inspection results and first-visible inspection-frame acknowledgements.

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-13T01-49-49-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-13T01-49-49-04-00-hotspot-input-picking-dsk-map.md`
5. `hotspot-picking-audit/2026-07-13T01-49-49-04-00-event-coordinate-camera-hit-contract.md`
6. `interaction-audit/2026-07-13T01-49-49-04-00-pointer-sample-raycast-command-map.md`
7. `gameplay-audit/2026-07-13T01-49-49-04-00-canvas-button-inspection-loop.md`
8. `render-audit/2026-07-13T01-49-49-04-00-pointer-camera-visible-frame-gap.md`
9. `next-steps.md`
10. `validation.md`

## Retained audit boundaries

```txt
browser save commit/reset convergence
scene progression and interlude admission
stage resource lifecycle and WebGL recovery
story manifest and snapshot authority
```

## Next safe ledge

Replace `mousemove` plus coordinate-less `click` with one pointer-event adapter that captures activation coordinates directly. Add the first-click, touch-tap, pointer-leave and parallax-click fixtures before changing story semantics.