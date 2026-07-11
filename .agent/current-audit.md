# Current audit: The Unmapped House

Timestamp: `2026-07-11T04-00-07-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene and nine total required clues. Completion opens a delayed interlude; Continue advances to the next scene; the final Continue projects prototype-complete copy.

## Interaction loop

```txt
load save
  -> shallow-merge mutable state
  -> resolve current scene
  -> construct StageKit and start RAF
  -> load scene and project UI
  -> inspect hotspot by DOM button or raycast
     -> mutate inspection/clue/log state
     -> derive completion from clues
     -> optionally schedule 450 ms interlude timer
     -> project UI
     -> write localStorage
  -> interlude callback mutates DOM
  -> Continue mutates story scene, route and log
     -> hide interlude
     -> replace live StageKit scene in place
     -> project UI
     -> write localStorage
     -> render on a later RAF
  -> final Continue changes DOM copy only
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scenes, nine hotspots, clue requirements, interlude copy, camera, fog, stage, material and post descriptors. |
| `src/game.js` | Save load/write/clear, mutable story state, implicit phase, inspection, completion, timer, Continue, terminal copy and DOM projection. |
| `src/stage-kit.js` | Three.js renderer, scene, camera, lights, render target, shaders, descriptor consumption, picking, resize, recursive RAF and in-place scene replacement. |
| `src/aspect-frame.js` | Canonical fixed 1920×1080 framing and DOM sizing. |

## Domains in use

```txt
browser-shell
fixed-aspect-layout
story-source-descriptors
scene-order and scene identity
hotspot identity and clue identity
mutable story state
scene route state
inspection ledger
clue ledger
notebook log
scene completion policy
implicit story phase
interlude timer policy
interlude DOM projection
Continue input and transition policy
terminal DOM projection
side-panel input
raycast input
keyboard reset input
localStorage read/write/clear effects
story copy projection
debug JSON projection
Three.js CDN runtime
stage render host
scene descriptor consumption
anime shader material
post-process pass
hotspot volume and picking
camera parallax
render-target composition
live scene replacement
stage resource lifecycle
RAF authority
resize/pointer/click listener lifecycle
GPU resource disposal
package syntax validation
static Pages deployment
repo-local audit ledger
central ledger synchronization
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel and interlude shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, camera, fog, stage, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate inspect, Continue, reset, projection, persistence and StageKit calls. |
| `clue-ledger-kit` | Grant unique clue strings and evaluate requirements. |
| `inspection-ledger-kit` | Track scene-keyed hotspot inspection flags. |
| `notebook-log-kit` | Prepend and cap recent story rows. |
| `scene-route-kit` | Resolve active scene and retain visited scene ids. |
| `interlude-timer-kit` | Schedule an unretained delayed DOM transition. |
| `terminal-route-kit` | Project prototype-complete copy without persisted terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, stringify, write and clear browser state without typed results. |
| `stage-render-kit` | Renderer, camera, lights, target, post scene and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert descriptors directly into live Three.js resources. |
| `anime-material-kit` | Build FBM/toon shader materials. |
| `post-process-kit` | Grain, vignette, chromatic offset, distortion, memory warp and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes with attached descriptor objects. |
| `hotspot-picking-kit` | Hover and click raycasts. |
| `camera-parallax-kit` | Pointer-driven locked-camera offsets. |
| `render-target-composition-kit` | Stage target plus post-process pass. |
| `debug-json-projection-kit` | Aggregate mutable story-state projection. |
| `package-syntax-check-kit` | Syntax-check the four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Central selection and findings history. |

## Main finding: the story-stage transition is not atomic

`nextScene()` mutates `currentScene`, `state.sceneId`, route and log, then hides the interlude before `StageKit.loadScene()` succeeds. `loadScene()` clears the committed stage and builds the next scene directly into live renderer state. Only after that does the runtime project the DOM and attempt to save.

A stage-construction failure can leave:

```txt
in-memory story = next scene
durable save    = prior scene
interlude       = hidden
DOM copy        = prior or partial
stage           = blank or partial
```

A save failure after successful stage construction can leave the visible stage and DOM on the next scene while reload returns to the prior scene.

## Render and lifecycle consequences

```txt
stage preparation   = absent
atomic stage swap   = absent
story commit result = absent
stage commit result = absent
transition id       = absent
stage epoch         = absent
first-frame ack     = absent
retired disposal    = absent
rollback result     = absent
```

`stageGroup.clear()` detaches prior objects without disposing geometry or materials. Resetting the material and hotspot arrays removes the remaining references. RAF and listener teardown are still not centrally owned.

## Candidate transition-authority kits

```txt
transition-command-kit
transition-admission-kit
transition-plan-kit
story-candidate-snapshot-kit
stage-build-plan-kit
stage-preparation-kit
durable-story-commit-kit
atomic-stage-commit-kit
transition-rollback-kit
retired-resource-ledger-kit
stage-epoch-kit
first-frame-acknowledgement-kit
transition-result-kit
transition-journal-kit
transition-fixture-kit
```

## Next safe ledge

```txt
TheUnmappedHouse Atomic Story/Stage Transition Authority
+ Prepare/Commit/Discard and First-Frame Fixture Gate
```

This depends on the previously identified versioned save envelope, typed persistence results, explicit story phase and admitted Continue command. The immediate goal is to preserve the previous committed scene until both persistence and detached stage preparation are ready, then publish one correlated story, stage, DOM and first-frame result.