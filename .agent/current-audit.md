# Current audit: The Unmapped House

Timestamp: `2026-07-11T01-38-28-04-00`

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
  -> Continue mutates route and scene
     -> replace StageKit scene
     -> project UI
     -> write localStorage
  -> final Continue changes DOM copy only
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scenes, nine hotspots, clue requirements, interlude copy, camera, fog, stage, material and post descriptors. |
| `src/game.js` | Save load/write/clear, mutable story state, implicit story phase, inspection, completion, timer, Continue, terminal copy and DOM projection. |
| `src/stage-kit.js` | Three.js renderer, scene, camera, lights, render target, shaders, descriptor consumption, picking, resize and recursive RAF. |
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
stage resource lifecycle
scene replacement policy
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

## Main finding: phase is not authoritative

The save contains `sceneId`, `clues`, `flags`, `inspected`, `route` and `log`, but no story phase, completion proof, interlude target, readiness deadline or terminal state.

A final inspection schedules `setTimeout(() => showInterlude(currentScene), 450)`. The timer id is not retained. The callback closes over mutable `currentScene` and carries no scene id, command id, save revision or epoch.

Reloading a completed scene restores all clues and inspection flags, so `sceneComplete(currentScene)` is true. Boot does not call `showInterlude()` or reschedule readiness. Re-inspection enters the already-seen branch, which does not evaluate completion. The player can be permanently stranded with a hidden Continue button.

`nextScene()` does not verify phase, completion, expected scene or expected save revision. A hidden, duplicated or stale Continue activation can mutate the route. At the final scene, terminal progress is only DOM copy and is not persisted.

## Render and lifecycle consequences

```txt
story phase       = derived or absent
interlude state   = DOM-only
stage identity    = live mutable currentScene
render evidence   = no phase/save/stage correlation
pending timer     = not cancelled on transition/reset/dispose
terminal evidence = no persisted terminal snapshot
```

StageKit also retains prior gaps: scene replacement clears committed objects before replacement preparation, retired resources are not disposed, RAF and listeners are not centrally owned, and no stage epoch exists.

## Candidate phase-authority kits

```txt
story-phase-state-machine-kit
scene-completion-proof-kit
interlude-deadline-kit
interlude-timer-adapter-kit
interlude-resume-kit
continue-command-kit
continue-admission-kit
continue-result-kit
terminal-story-state-kit
phase-reconciliation-kit
phase-projection-kit
phase-stage-correlation-kit
story-phase-journal-kit
story-phase-fixture-kit
```

## Next safe ledge

```txt
TheUnmappedHouse Story Phase Recovery Authority
+ Interlude/Continue Admission Fixture Gate
```

This must use the previously identified versioned durable save envelope and typed persistence results. The immediate goal is to make completion, pending interlude, open interlude, transition and terminal progress reload-safe and command-admitted without changing story content or visuals.
