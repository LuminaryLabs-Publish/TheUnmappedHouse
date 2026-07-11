# Current audit: The Unmapped House

Timestamp: `2026-07-11T10-12-03-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene and nine total required clues. Completing a scene schedules a 450 ms interlude; Continue advances the story and replaces the live Three.js stage; the final Continue projects prototype-complete copy.

## Plan ledger

**Goal:** identify the exact authority boundary required to make Continue a single durable story, stage, persistence and visible-frame transaction.

- [x] Trace startup, inspection, completion, interlude and Continue.
- [x] Trace story mutation order.
- [x] Trace StageKit replacement and Three.js resource ownership.
- [x] Trace persistence timing and failure behavior.
- [x] Trace frame-loop acknowledgement and terminal behavior.
- [x] Inventory all domains, kits and services.
- [x] Define the candidate transition DSK composition.
- [x] Define deterministic fixture rows.
- [ ] Implement the authority boundary.
- [ ] Run Node and browser fixtures.

## Interaction loop

```txt
load `.v1` state
  -> shallow-merge into initial state
  -> resolve current scene
  -> create StageKit
  -> StageKit starts recursive requestAnimationFrame
  -> load current scene into live stage
  -> inspect scene hotspots
  -> mutate inspection/clue/log state
  -> derive completion
  -> setTimeout(showInterlude, 450)
  -> Continue invokes nextScene()
  -> mutate story identity and route
  -> hide interlude
  -> StageKit clears live stage and builds replacement
  -> update DOM projection
  -> localStorage write
  -> later RAF renders whatever stage state exists
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three mutable scene descriptors, nine hotspots, clue requirements, copy, camera, stage, material and post data. |
| `src/game.js` | Persistence, active scene, inspection, completion, delayed interlude, Continue, terminal copy and DOM projection. |
| `src/stage-kit.js` | Three.js renderer, scene resources, live scene replacement, picking, resize listeners and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and browser fitting. |
| `package.json` | Syntax-only checks and local static serving. |

## Domains in use

```txt
browser shell
fixed-aspect layout
story source descriptors
scene order and identity
hotspot and clue identity
mutable story state
scene route state
inspection ledger
clue ledger
notebook ledger
scene completion policy
implicit story phase
interlude timing and projection
Continue transition policy
terminal projection
localStorage load, write and clear effects
story copy and debug projection
Three.js CDN runtime
stage render host
scene descriptor consumption
procedural anime materials
post-processing pass
hotspot volumes and raycast picking
camera parallax
render-target composition
live scene replacement
Three.js geometry/material resource lifecycle
recursive frame loop
browser listener lifecycle
syntax validation
static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
versioned StoryManifest and StorySnapshot
inspection command authority
scene completion proof
Continue command and admission
transition transaction identity
detached stage preparation
story transition candidate
durable persistence commit
atomic live-stage commit
transition rollback
stage epoch
first rendered frame acknowledgement
retired resource ledger
geometry/material disposal
interlude timeout lease
transition journal
behavioral fixture execution
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel and interlude shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, camera, fog, stage, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate load, inspection, completion, Continue, reset, projection, persistence and StageKit calls. |
| `scene-route-kit` | Resolve the active scene and mutate route order. |
| `inspection-ledger-kit` | Track scene-keyed hotspot flags. |
| `clue-ledger-kit` | Grant unique global clue strings and evaluate requirements. |
| `notebook-log-kit` | Prepend and cap recent story rows. |
| `interlude-timer-kit` | Schedule the unowned 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without a durable terminal phase. |
| `localstorage-save-kit` | Parse, shallow-merge, stringify, write and clear browser state without typed results. |
| `stage-render-kit` | Own renderer, camera, lights, target, post scene and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Build FBM/toon shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes carrying full descriptor objects. |
| `hotspot-picking-kit` | Perform hover/click raycasts and return descriptor payloads. |
| `camera-parallax-kit` | Apply pointer-driven locked-camera offsets. |
| `render-target-composition-kit` | Render the stage target and post-process pass. |
| `debug-json-projection-kit` | Project mutable story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check the four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: story advancement precedes transition proof

`nextScene()` executes this order:

```txt
resolve next scene
  -> assign currentScene
  -> assign state.sceneId
  -> append route
  -> append notebook row
  -> hide interlude
  -> stage.loadScene(next)
  -> renderUi()
  -> saveState()
```

The story has already advanced before stage preparation or storage succeeds.

## Stage replacement is destructive before success

`StageKit.loadScene()` begins by:

```txt
assign sceneData
stageGroup.clear()
hotspots = []
materials = []
```

It then mutates background, fog, camera, post uniforms and creates each layer, prop and hotspot directly in the live group.

Consequences:

- No detached candidate stage exists.
- A descriptor or Three.js construction failure can leave a partial live stage.
- The previous stage cannot be restored because its children were detached first.
- No typed preparation or commit result exists.
- Story and stage revisions cannot be correlated.

## Resource-retirement gap

`stageGroup.clear()` does not dispose:

```txt
PlaneGeometry
BoxGeometry
CylinderGeometry
hotspot BoxGeometry
scene shader materials
hotspot materials
```

`this.materials = []` discards the tracked scene-material references. Each successful scene transition therefore leaves prior GPU resources eligible for leakage until page teardown, but page teardown also has no `dispose()` path.

## Persistence and terminal gaps

`saveState()` runs after live mutation and exposes no result. Quota, security or serialization failure can leave the visible next scene active while persistence remains stale.

For the final scene, Continue only replaces interlude copy. It does not write an explicit terminal phase, transition id or durable completion receipt, and repeated Continue presses have no typed no-op result.

## Frame-correlation gap

The recursive RAF has no frame id, stage epoch or callback for the first frame containing the replacement scene. Continue cannot distinguish:

```txt
prepared
story-committed
stage-committed
saved
first-frame-visible
failed
rolled-back
```

## Required parent domain

```txt
the-unmapped-house-story-stage-transition-domain
```

Candidate coordinating kits:

```txt
continue-command-kit
continue-admission-kit
scene-transition-plan-kit
detached-stage-preparation-kit
story-transition-candidate-kit
durable-story-commit-kit
atomic-stage-commit-kit
transition-rollback-kit
transition-result-kit
stage-epoch-kit
first-frame-acknowledgement-kit
retired-stage-resource-kit
stage-resource-disposal-kit
interlude-timeout-lease-kit
transition-journal-kit
continue-transition-fixture-kit
browser-first-frame-smoke-kit
```

## Required authority flow

```txt
Continue command
  -> admit completion proof, story revision and current stage epoch
  -> build immutable transition plan
  -> prepare next scene in a detached Three.js group
  -> validate prepared resource counts and hotspot bindings
  -> build candidate StorySnapshot
  -> durably write candidate snapshot
  -> atomically swap live stage group and stage epoch
  -> project DOM from committed snapshot
  -> retire and dispose previous stage resources
  -> acknowledge first rendered frame
  -> emit typed committed result and journal row
```

Failure before the live swap must leave the prior story, DOM, save and stage untouched. Failure after durable save but before live swap must execute a defined compensation or recovery policy.

## Ordered implementation queue

```txt
1. Versioned StoryManifest and StorySnapshot
2. Save admission, migration and reconciliation
3. Inspection Command Authority and completion proof
4. Atomic Story/Stage Continue Transition
5. Runtime Session Lifecycle and complete disposal
6. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse Atomic Story/Stage Continue Transition Authority
+ Rollback, Resource Retirement and First-Frame Fixture Gate
```
