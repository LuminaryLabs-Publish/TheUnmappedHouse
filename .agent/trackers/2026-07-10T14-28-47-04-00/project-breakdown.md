# Project breakdown: The Unmapped House

Timestamp: `2026-07-10T14-28-47-04-00`

## Plan ledger

### Goal

Document the current story, interaction, persistence, and render architecture without changing runtime behavior, then define the smallest safe implementation ledge that makes every player action traceable from input through story result, browser side effect, StageKit observation, save write, and diagnostic readback.

### Checklist

- [x] Compare the full accessible `LuminaryLabs-Publish` repository list against the central repo ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm every other accessible Publish repo is centrally tracked and has sampled root `.agent` state.
- [x] Choose only one repo using oldest documented-selection fallback.
- [x] Read the live interaction entry, story descriptor source, StageKit renderer, package scripts, and prior `.agent` state.
- [x] Identify the interaction loop.
- [x] Identify current and next-cut domains.
- [x] Identify kit services.
- [x] Identify current and next-cut kits.
- [x] Add timestamped architecture, render, interaction, gameplay, story-authority, save-system, deploy, and turn-ledger audits.
- [x] Refresh root `.agent` pointers and status docs.
- [x] Push repo-local documentation to `main` only.
- [x] Synchronize the central ledger and internal change log.

## Selection comparison

The accessible organization list and central ledgers were compared before selection:

```txt
LuminaryLabs-Publish/TheUnmappedHouse   selected / prior central latest 2026-07-10T13-01-11-04-00
LuminaryLabs-Publish/MyCozyIsland       tracked / root .agent present / central latest 2026-07-10T13-08-51-04-00
LuminaryLabs-Publish/TheOpenAbove       tracked / root .agent present / central latest 2026-07-10T13-21-23-04-00
LuminaryLabs-Publish/PrehistoricRush    tracked / root .agent present / central latest 2026-07-10T13-30-15-04-00
LuminaryLabs-Publish/AetherVale         tracked / root .agent present / central latest 2026-07-10T13-41-21-04-00
LuminaryLabs-Publish/IntoTheMeadow      tracked / root .agent present / central latest 2026-07-10T13-50-05-04-00
LuminaryLabs-Publish/HorrorCorridor     tracked / root .agent present / central latest 2026-07-10T13-58-16-04-00
LuminaryLabs-Publish/PhantomCommand     tracked / root .agent present / central latest 2026-07-10T14-11-51-04-00
LuminaryLabs-Publish/ZombieOrchard      tracked / root .agent present / central latest 2026-07-10T14-21-28-04-00
LuminaryLabs-Publish/TheCavalryOfRome   excluded by rule
```

No eligible repo was new, ledger-missing, missing sampled root `.agent` state, or otherwise undocumented. `TheUnmappedHouse` was therefore the oldest eligible documented fallback.

## Product read

A three-scene fixed-camera anime-horror point-and-click prototype. The player inspects three hotspots per scene, accumulates required clues, opens an interlude, advances to the next scene, and eventually reaches a terminal prototype-complete message.

## Interaction loop

```txt
open index.html
  -> module loads src/game.js
  -> game.js imports scenes and constructs StageKit
  -> loadState shallow-merges localStorage over initial state
  -> current scene resolves from saved sceneId
  -> StageKit.loadScene consumes camera, stage, hotspot, fog, and post descriptors
  -> renderUi projects scene copy, hotspot buttons, completion state, and debug JSON
  -> player clicks a side-panel button or raycast hotspot
  -> inspectHotspot mutates inspected/clues/log or performs repeat-read side effects
  -> sceneComplete checks required clues
  -> completion schedules interlude DOM opening after 450 ms
  -> continue advances scene, updates route, reloads StageKit, rerenders, and saves
  -> final continue writes terminal copy directly into interlude DOM
  -> KeyR clears the save key and reloads the page
```

## Current authority split

```txt
src/story-data.js
  descriptor authority: title, scenes, hotspots, grants, requirements, camera, stage, fog, post, interlude copy

src/game.js
  runtime authority: load/save, command interpretation, state mutation, completion, route transitions,
  interlude timing, DOM projection, StageKit calls, terminal copy, reset, debug JSON

src/stage-kit.js
  render authority: fixed frame, Three.js renderer, scene consumption, shader materials, fog, camera,
  parallax, hotspot volumes, raycast picking, hover label, render target, post-processing, animation loop

src/aspect-frame.js
  layout authority: design resolution and letterbox/pillarbox frame calculation
```

## Domains in use

```txt
browser-shell
fixed-aspect-layout
story-copy-projection
interlude-route-projection
hover-label-projection
story-source-descriptors
scene-source-descriptors
hotspot-source-descriptors
stage-source-descriptors
post-source-descriptors
story-state
scene-route-state
clue-ledger
inspection-ledger
notebook-log
completion-policy
interlude-policy
terminal-route-policy
localstorage-persistence
browser-command-adapter
side-panel-input
raycast-input
keyboard-reset-input
stage-render-host
three-cdn-runtime
scene-descriptor-consumption
procedural-anime-material
post-process-pass
hotspot-volume
raycast-picking
camera-parallax
render-target-composition
debug-json-projection
repo-local-agent-ledger
central-ledger-sync
```

Next-cut proof domains:

```txt
story-source-manifest
story-command-envelope
story-command-preflight
story-command-result
story-command-correlation
story-state-transition
story-projection-ledger
browser-effect-intent
browser-effect-readback
stage-load-observation
stage-pick-observation
save-write-observation
story-replay
gamehost-story-diagnostics
dom-free-story-fixture
```

## Kit services

| Kit | Services currently offered |
|---|---|
| `static-page-shell-kit` | Mounts the fixed frame, stage, story panel, hotspot list, debug panel, hover label, and interlude. |
| `aspect-frame-kit` | Computes and applies the canonical fixed-aspect viewport. |
| `story-data-kit` | Supplies scene, hotspot, clue, requirement, interlude, camera, stage, fog, material, and post descriptors. |
| `browser-story-runtime-kit` | Loads state, interprets inspect/continue/reset actions, mutates state, schedules interludes, calls StageKit, projects DOM, and saves. |
| `localstorage-save-kit` | Reads, shallow-merges, serializes, writes, and clears the prototype save state. |
| `notebook-log-kit` | Prepends log entries and limits retained rows to eight. |
| `stage-render-kit` | Creates the WebGL renderer, camera, scene, lights, fog, render target, descriptor consumers, and frame loop. |
| `scene-descriptor-consumer-kit` | Converts stage layers, props, hotspots, camera, fog, and post descriptors into live render objects. |
| `anime-material-kit` | Creates procedural triplanar-like noise/toon shader materials. |
| `post-process-kit` | Applies grain, vignette, chromatic offset, distortion, memory warp, and scan-line effects. |
| `hotspot-volume-kit` | Builds invisible hotspot meshes from source descriptors. |
| `hotspot-picking-kit` | Performs raycast hover/click selection and forwards the selected hotspot callback. |
| `debug-json-projection-kit` | Projects aggregate scene, clue, route, inspection, completion, and recent-log state. |
| `repo-local-agent-ledger-kit` | Stores the current architectural audit and timestamped history. |
| `central-ledger-sync-kit` | Mirrors selection, findings, and next ledge into `LuminaryLabs-Dev/LuminaryLabs`. |

## Kits

Current inferred kits:

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
localstorage-save-kit
notebook-log-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
debug-json-projection-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

Next-cut kits:

```txt
story-source-manifest-kit
story-source-fingerprint-kit
story-state-snapshot-kit
story-command-envelope-kit
story-command-reason-kit
story-command-preflight-kit
story-command-result-kit
story-command-correlation-kit
story-transition-ledger-kit
story-projection-ledger-kit
browser-effect-intent-kit
browser-effect-readback-kit
stage-load-observation-kit
stage-pick-observation-kit
save-write-observation-kit
story-replay-kit
gamehost-story-diagnostics-kit
dom-free-story-fixture-kit
```

## Main finding

The visible route does not need more rooms, inventory, audio, renderer extraction, or a StageKit rewrite next. The missing capability is correlation: a click cannot currently be followed through a stable command id, decision, state transition, projection, save write, interlude/terminal intent, StageKit load or pick observation, and final diagnostic row.

`inspectHotspot()` and `nextScene()` perform commands and browser effects together and return no typed result. `StageKit.clickHotspot()` forwards a callback without recording the picked source id or the consumer result. `saveState()` writes without an observation row. The debug panel therefore shows aggregate state but cannot prove causality or parity.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Correlation Ledger Refresh + StageKit Observation Fixture Gate
```

## Validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof modules do not exist yet
pushed to main: yes
central ledger updated: yes
```
