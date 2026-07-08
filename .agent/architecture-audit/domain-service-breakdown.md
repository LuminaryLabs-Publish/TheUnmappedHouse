# Architecture Audit: Domain and Service Breakdown

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T01:50:19-04:00`

## Current architecture

```txt
index.html
└─ src/game.js
   ├─ imports src/stage-kit.js
   ├─ imports src/story-data.js
   ├─ owns browser DOM bindings
   ├─ owns story state mutation
   ├─ owns localStorage persistence
   ├─ owns interlude progression
   └─ owns debug projection

src/stage-kit.js
├─ owns Three.js renderer
├─ owns camera and parallax
├─ owns raycaster and pointer input
├─ owns lights, fog, scene group, render target, and post scene
├─ creates stage layers
├─ creates stage props
├─ creates hotspot hit volumes
├─ projects hover label
└─ owns animation frame loop

src/story-data.js
└─ owns scene descriptors
   ├─ camera
   ├─ stage layers
   ├─ props
   ├─ post settings
   ├─ hotspots
   ├─ clue grants
   ├─ completion requirements
   └─ interlude text
```

## Desired architecture

```txt
unmapped-house-runtime
├─ static-shell
│  └─ index.html consumes host entry only
├─ story-authority
│  ├─ story-source-snapshot-kit
│  ├─ story-state-snapshot-kit
│  ├─ story-command-envelope-kit
│  ├─ command-validation-kit
│  ├─ inspection-action-kit
│  ├─ inspection-result-contract-kit
│  ├─ clue-ledger-reducer-kit
│  ├─ scene-completion-result-kit
│  └─ scene-transition-result-kit
├─ state-and-save
│  ├─ route-journal-kit
│  ├─ command-journal-kit
│  ├─ save-result-kit
│  └─ localstorage-save-adapter-kit
├─ stage-descriptor
│  ├─ stage-scene-snapshot-kit
│  ├─ layer-descriptor-kit
│  ├─ prop-descriptor-kit
│  ├─ hotspot-volume-descriptor-kit
│  └─ stage-descriptor-validation-kit
├─ renderer-host
│  ├─ fixed-camera-render-host-kit
│  ├─ fixed-camera-parallax-kit
│  ├─ anime-material-shader-kit
│  ├─ postprocess-memory-kit
│  ├─ hotspot-raycast-kit
│  └─ hover-label-adapter-kit
└─ diagnostics-and-fixtures
   ├─ gamehost-diagnostics-kit
   ├─ dom-free-fixture-kit
   ├─ hotspot-fixture-matrix-kit
   └─ scene-completion-fixture-kit
```

## Domain details

### `story-authority`

Owns all state transitions caused by player intent.

Inputs:

```txt
current state snapshot
story source snapshot
command envelope
```

Outputs:

```txt
accepted/rejected command result
new state snapshot
result events
journal rows
save intent
UI projection hints
```

Must not import:

```txt
DOM
Three.js
localStorage
CSS
requestAnimationFrame
```

### `stage-descriptor`

Owns validation and normalization of scene descriptors before rendering.

Inputs:

```txt
story scene descriptor
```

Outputs:

```txt
validated camera descriptor
validated layer descriptors
validated prop descriptors
validated hotspot volume descriptors
validated post-process descriptor
validation warnings/errors
```

Must not own:

```txt
WebGLRenderer
DOM pointer listeners
story clue mutation
save state
```

### `renderer-host`

Owns live Three.js presentation only.

Inputs:

```txt
validated stage scene snapshot
pointer state
render time
```

Outputs:

```txt
rendered frame
hovered hotspot id
clicked hotspot id
renderer diagnostics
```

Must not own:

```txt
story progression
clue grants
scene completion
save/load authority
```

### `state-and-save`

Owns the adapter boundary between pure state and browser persistence.

Inputs:

```txt
save result
load request
reset request
```

Outputs:

```txt
serialized payload
loaded state candidate
reset acknowledgement
save/load diagnostic
```

Must not decide story validity.

## Current service list

```txt
createInitialState
loadState
saveState
hasClue
grantClues
writeLog
sceneComplete
inspectHotspot
showInterlude
nextScene
renderUi
StageKit.constructor
StageKit.animeMaterial
StageKit.loadScene
StageKit.createLayer
StageKit.createProp
StageKit.createHotspot
StageKit.handlePointer
StageKit.pick
StageKit.clickHotspot
StageKit.resize
StageKit.animate
```

## Service migration map

```txt
createInitialState
  -> story-state-snapshot-kit

loadState / saveState
  -> localstorage-save-adapter-kit
  -> save-result-kit

hasClue / grantClues
  -> clue-ledger-reducer-kit

sceneComplete
  -> scene-completion-result-kit

inspectHotspot
  -> story-command-envelope-kit
  -> inspection-action-kit
  -> inspection-result-contract-kit

nextScene
  -> scene-transition-result-kit
  -> route-journal-kit

renderUi
  -> story-ui-projection-adapter

StageKit.createLayer/createProp/createHotspot
  -> stage-descriptor-validation-kit
  -> renderer-host adapters
```

## Next implementation order

1. Add pure story authority functions.
2. Add fixture replay around story authority.
3. Add descriptor validation without changing visuals.
4. Add GameHost diagnostics.
5. Split StageKit only after story fixtures pass.