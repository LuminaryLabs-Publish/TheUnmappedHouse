# Gameplay audit: resize, scene and visible-cost loop

**Timestamp:** `2026-07-12T13-08-15-04-00`

## Summary

Story interaction is lightweight, but every resize can replace both physical render surfaces while the recursive RAF continues. The player-facing story state has no receipt showing that the scene, post-process settings and visible pixels were rendered against one admitted surface revision.

## Plan ledger

**Goal:** map viewport change through render allocation and visible story output without conflating successful gameplay state with successful presentation.

- [x] Trace boot, inspection, Continue, resize and frame paths.
- [x] Identify surface mutation during active play.
- [x] Identify missing surface-to-story and surface-to-frame provenance.
- [x] Define required gameplay-facing invariants.
- [ ] Execute browser resize and interaction fixtures.

## Loop

```txt
player inspects hotspot
  -> story state mutates
  -> UI and save update
  -> recursive RAF continues

window or device layout changes
  -> resize event samples viewport and DPR
  -> fixed-aspect CSS frame changes
  -> renderer drawing buffer reallocates
  -> offscreen target reallocates
  -> no gameplay pause, prepare barrier or surface result

next RAF
  -> current scene renders to whichever allocations survived
  -> post pass renders to default framebuffer
  -> no visible-frame receipt ties story and surface revisions together
```

## Player-visible risks

```txt
resize allocation failure can blank or corrupt presentation while story state remains advanced
mixed renderer and target dimensions can distort or invalidate post processing
large reallocations can create frame stalls during inspection or transition
rapid orientation changes can repeatedly allocate before the newest layout stabilizes
screenshots cannot establish which DPR and target dimensions produced the story frame
```

## Required gameplay-facing invariants

```txt
story mutation never depends on successful resize
failed resize preserves the last valid visible surface
scene and post descriptors render only against one committed surface revision
Continue cannot report a visible successor until a frame cites scene and surface revisions
inspection feedback cannot report visible until its frame cites story and surface revisions
resize observations do not mutate story progress
```

## Required receipts

```txt
StoryResult
  storyRevision
  sceneId

RenderSurfaceResult
  surfaceRevision
  physical dimensions
  target sample count

VisibleFrameAck
  frameId
  storyRevision
  sceneId
  surfaceRevision
```

## Fixture rows

```txt
resize-during-inspection-preserves-story-result
resize-failure-preserves-prior-visible-scene
orientation-burst-commits-newest-surface-only
continue-visible-frame-cites-successor-scene-and-surface
inspection-visible-frame-cites-story-and-surface
```

The game loop can remain simple, but visible success must require both canonical story state and committed presentation state.