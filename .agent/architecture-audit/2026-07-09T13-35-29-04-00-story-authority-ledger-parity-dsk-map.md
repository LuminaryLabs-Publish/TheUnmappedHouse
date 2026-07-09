# Architecture Audit - Story Authority Ledger Parity DSK Map

**Timestamp:** `2026-07-09T13-35-29-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Architectural read

The app is currently split into a stable visual StageKit surface and a browser-bound story controller.

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`src/story-data.js` is already an effective source descriptor surface.

`src/stage-kit.js` is already an effective render consumer surface.

`src/game.js` is the boundary that needs fractalization: it owns command dispatch, story mutation, scene completion, save IO, route mutation, interlude timing, StageKit loading, UI projection, reset, and debug JSON.

## Implemented DSK map

```txt
static-page-shell-domain
  static-page-shell-kit
    owns index.html story panel, stage mount, hotspot list, notebook/debug panel, interlude overlay, and module entry.

aspect-frame-domain
  aspect-frame-kit
    owns DESIGN_WIDTH, DESIGN_HEIGHT, DESIGN_ASPECT, computeAspectFrame(), and applyAspectFrame().

stage-render-domain
  stage-render-kit
    owns renderer setup, scene graph, camera, render target, resize, frame loop, and final draw.

stage-descriptor-domain
  stage-layer-descriptor-kit
  stage-prop-descriptor-kit
  stage-hotspot-volume-kit
    own descriptor-to-mesh construction for layers, props, and invisible hotspot boxes.

visual-material-domain
  anime-material-kit
  post-process-kit
    own triplanar-style toon material uniforms and screen post-processing uniforms.

interaction-domain
  hotspot-picking-kit
  hover-label-projection-kit
    own pointer math, raycast hits, hover state, click callback dispatch, and label placement.

story-source-domain
  story-data-kit
    owns game title, scenes, camera descriptors, stage descriptors, hotspot definitions, grants, completion requirements, and interlude copy.

browser-story-runtime-domain
  browser-story-runtime-kit
  localstorage-save-kit
  debug-json-projection-kit
    own current browser mutation path, localStorage load/save, UI projection, reset, and debug JSON.

agent-ledger-domain
  repo-local-agent-ledger-kit
    owns .agent tracker, audit, validation, and root handoff docs.
```

## Missing next-cut DSK map

```txt
story-authority-domain
  story-source-manifest-kit
  story-source-snapshot-kit
  story-state-snapshot-kit
  stage-scene-snapshot-kit
  story-command-envelope-kit
  story-command-reason-kit
  story-preflight-kit
  story-command-result-kit
  story-event-record-kit
  story-reducer-kit

projection-domain
  story-projection-kit
  save-projection-kit
  interlude-projection-kit
  stage-projection-kit
  browser-adapter-plan-kit
  browser-adapter-readback-kit

host-diagnostics-domain
  gamehost-story-diagnostics-kit
  repo-local-ledger-readback-kit
  central-ledger-readback-kit

fixture-domain
  dom-free-story-fixture-kit
```

## Required contract shape

```txt
StorySourceManifest
  productId
  routeId
  sourceVersion
  publicEntry
  saveKey
  sceneIds
  hotspotIds
  commandIds
  resultStatuses
  reasonCodes
  fixtureRows
  repoLocalLedgerPath
  centralLedgerPath

StoryCommandEnvelope
  commandId
  targetSceneId
  targetHotspotId
  sourceVersion
  requestedAtFrame

StoryCommandResult
  status
  reason
  beforeSnapshot
  afterSnapshot
  events
  storyProjection
  saveProjection
  interludeProjection
  stageProjection
  browserAdapterPlan
```

## Do not extract yet

```txt
StageKit renderer internals
Three.js material implementation
fixed 16:9 aspect frame
story copy
new rooms
inventory
audio
browser-only smoke runner
```

## Main architecture finding

The durable architecture gap is not visual fidelity or scene composition.

The durable gap is source-owned story authority with a fixture-readable command/result/projection/readback seam.
