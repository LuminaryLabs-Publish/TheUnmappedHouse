# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T00-00-26-04-00`

## Plan ledger

**Goal:** Preserve the current three-scene story and rendering while defining a durable story-commit boundary that keeps in-memory state, localStorage, interlude projection, terminal projection and StageKit scene identity recoverable when browser effects fail.

- [x] Compare the full accessible `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `TheUnmappedHouse` by the oldest documented-selection rule.
- [x] Read the current root audit state and prior timestamped handoff.
- [x] Read `src/game.js`, `src/stage-kit.js`, `src/story-data.js` and `package.json`.
- [x] Identify the interaction loop, domains, kits and kit services.
- [x] Trace every localStorage read, write and clear call.
- [x] Trace mutation, rendering, interlude scheduling and stage-loading order around persistence.
- [x] Define the next DSK boundary and deterministic fixture rows.
- [x] Change documentation only.
- [x] Create no branch and no pull request.

## Selection

The accessible organization inventory contains:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

`TheCavalryOfRome` is excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. Current direct-review ordering at selection:

```txt
TheUnmappedHouse     selected / 2026-07-10T22-21-17-04-00
MyCozyIsland         tracked  / 2026-07-10T22-29-21-04-00
AetherVale           tracked  / 2026-07-10T22-50-02-04-00
IntoTheMeadow        tracked  / 2026-07-10T22-58-36-04-00
PrehistoricRush      tracked  / 2026-07-10T23-08-11-04-00
TheOpenAbove         tracked  / 2026-07-10T23-20-41-04-00
HorrorCorridor       tracked  / 2026-07-10T23-30-13-04-00
PhantomCommand       tracked  / 2026-07-10T23-40-35-04-00
ZombieOrchard        tracked  / 2026-07-10T23-50-53-04-00
TheCavalryOfRome     excluded
```

## Interaction loop

```txt
page boot
  -> read localStorage and shallow-merge state
  -> resolve current scene
  -> construct StageKit
     -> allocate renderer, render target, materials and listeners
     -> start recursive RAF
  -> load the current scene
  -> render story UI
  -> write the current state to localStorage
  -> inspect through button or raycast
     -> mutate inspected, clues and log
     -> optionally schedule the interlude timer
     -> project UI
     -> write localStorage
  -> Continue
     -> mutate current scene and route
     -> hide interlude
     -> replace StageKit scene
     -> project UI
     -> write localStorage
  -> KeyR
     -> clear localStorage
     -> reload page
```

## Current domains

```txt
browser shell
fixed-aspect layout
story-source descriptors
scene, hotspot and clue identity
story state and route state
inspection, clue and notebook ledgers
completion policy
interlude timer policy
terminal projection
side-panel, raycast and reset input
localStorage read/write/clear effects
story, interlude and debug projection
Three.js runtime admission
stage render host
scene descriptor consumption
anime material generation
post-processing
hotspot volume and picking
camera parallax
render-target composition
stage resource lifecycle
scene replacement
frame-loop and listener lifecycle
package syntax validation
static Pages deployment
repo-local and central audit ledgers
```

## Current kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel and interlude shell. |
| `aspect-frame-kit` | Canonical fixed 16:9 viewport computation and DOM projection. |
| `story-data-kit` | Scene, hotspot, clue, camera, fog, stage, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Inspect, Continue, reset, projection, persistence and StageKit coordination. |
| `clue-ledger-kit` | Unique clue insertion and requirement membership. |
| `inspection-ledger-kit` | Scene-keyed hotspot inspection flags. |
| `notebook-log-kit` | Prepend and cap recent story rows. |
| `scene-route-kit` | Active-scene resolution and visited-scene history. |
| `interlude-timer-kit` | Schedule delayed DOM projection through an unretained timer. |
| `terminal-route-kit` | Project prototype-complete copy without persisted terminal authority. |
| `localstorage-save-kit` | Parse, shallow-merge, stringify, write and clear browser state. |
| `stage-render-kit` | Renderer, camera, lights, scene, render target, post scene and RAF. |
| `scene-descriptor-consumer-kit` | Convert story descriptors into Three.js layers, props and hotspots. |
| `anime-material-kit` | Build and animate FBM/toon shader materials. |
| `post-process-kit` | Grain, vignette, chromatic offset, distortion, memory warp and scan lines. |
| `hotspot-volume-kit` | Invisible interaction meshes and descriptor attachment. |
| `hotspot-picking-kit` | Hover and click raycasts. |
| `camera-parallax-kit` | Pointer-driven fixed-camera offset. |
| `render-target-composition-kit` | Stage render target and full-screen post pass. |
| `debug-json-projection-kit` | Aggregate mutable story-state projection. |
| `package-syntax-check-kit` | Syntax-check four JavaScript modules. |
| `static-pages-deploy-kit` | Publish static files from `main`. |
| `repo-local-agent-ledger-kit` | Root pointers and timestamped audit history. |
| `central-ledger-sync-kit` | Central selection, findings and handoff history. |

## Main finding

`localStorage` is currently treated as an infallible helper even though it is part of the story transaction.

```txt
inspectHotspot:
  mutate story state
  schedule interlude timer
  project UI
  localStorage.setItem

nextScene:
  mutate story scene and route
  hide interlude
  replace rendered stage
  project UI
  localStorage.setItem

boot:
  construct StageKit and start RAF/listeners
  load and render scene
  localStorage.setItem
```

`localStorage.setItem()` can throw. No write is wrapped, no typed `SaveResult` exists and no durable revision confirms which story snapshot was committed. A failed inspection write can still leave an interlude timer scheduled. A failed Continue write can leave the rendered stage and in-memory route ahead of the durable save. A boot write failure can throw after WebGL resources, listeners and RAF have already been acquired, with no rollback or teardown.

## Next safe ledge

```txt
TheUnmappedHouse Durable Story Commit Authority
+ Persistence Failure and Recovery Fixture Gate
```

## Required order

```txt
versioned StorySnapshot and source identity
  -> typed persistence load/write/clear results
  -> monotonic save revision and state fingerprint
  -> pure command result before browser effects
  -> recoverable story/stage/persistence commit protocol
  -> projection only from the committed snapshot
  -> startup cleanup stack and fatal rollback
  -> bounded JSON-safe persistence journal
  -> injected-storage headless fixtures
  -> browser denial/quota/reload smoke
```

## Validation status

Documentation-only. Runtime source, package scripts, dependencies, routes, rendering and deployment behavior were not changed. Existing validation remains syntax-only; no persistence-failure or recovery fixture exists.