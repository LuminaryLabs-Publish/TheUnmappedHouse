# Render audit: destructive StageKit load and render-commit gap

Timestamp: `2026-07-10T17-29-23-04-00`

## Current load order

```txt
sceneData assigned
  -> active stageGroup cleared
  -> hotspot/material tracking replaced
  -> background/fog changed
  -> camera changed
  -> layers built
  -> props built
  -> hotspot volumes built
  -> post uniforms changed
  -> permanent RAF renders current live state
```

## Failure surface

Any error after `stageGroup.clear()` can expose a partial replacement. Examples include invalid vector lengths, missing camera data, unsupported geometry values, shader allocation failure, context loss, or future descriptor expansion.

There is no render-safe boundary between:

```txt
old scene visible
replacement resources buildable
replacement scene committed
first replacement frame presented
old resources retired
```

## Resource footprint

Across the current three scenes:

```txt
layers: 6
props: 13
hotspot volumes: 9
shader materials: 19 per complete route
mesh geometries: 28 per complete route
```

The exact GPU allocation varies by Three.js internals, but the ownership gap is source-visible: every layer/prop creates a geometry and shader material; every hotspot creates a box geometry and transparent material. `stageGroup.clear()` removes them from the graph without disposing them.

## Required render contract

```txt
StageLoadRequest
  sceneId
  transitionId
  expectedEpochId
  descriptorFingerprint

StageBuildObservation
  buildPlanId
  created resource counts
  validation rows

StageCommitObservation
  commitId
  priorEpochId
  activeEpochId
  camera/fog/post fingerprint
  retired resource counts

StageFrameAcknowledgement
  frameId
  activeEpochId
  sceneId
  viewport
  camera fingerprint
  presented resource counts
```

## Acceptance conditions

- The active stage remains untouched until the replacement build succeeds.
- Camera, fog, background, group, hotspots, and post settings commit together.
- A failed build leaves the prior scene visible and interactive.
- Retired resources are disposed exactly once after commit.
- The first rendered frame acknowledges the committed epoch.
- Diagnostics contain only detached JSON-safe values.
- Existing visuals and animation timing remain unchanged.
