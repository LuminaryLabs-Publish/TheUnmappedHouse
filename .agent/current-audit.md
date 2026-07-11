# Current audit: The Unmapped House

Timestamp: `2026-07-11T06-21-57-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene and nine total required clues. Completion opens a delayed interlude; Continue advances to the next scene; the final Continue projects prototype-complete copy.

## Interaction loop

```txt
load save
  -> shallow-merge mutable state
  -> resolve current scene
  -> construct StageKit and start recursive RAF
  -> load scene and project UI
  -> inspect through side-panel button or canvas raycast
     -> pass full hotspot descriptor object
     -> record descriptor.id under currentScene.id
     -> grant descriptor.grants to global clue array
     -> derive current-scene completion
     -> optionally schedule 450 ms interlude timer
     -> project UI and write localStorage
  -> Continue mutates story and replaces live StageKit scene
  -> final Continue changes DOM copy only
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scenes, nine hotspots, clue requirements, interlude copy, camera, fog, stage, material and post descriptors. |
| `src/game.js` | Save effects, mutable story state, inspection, clue grants, completion, timers, Continue and DOM projection. |
| `src/stage-kit.js` | Three.js renderer, scene, camera, render target, shaders, hotspot meshes, picking, resize, RAF and scene replacement. |
| `src/aspect-frame.js` | Canonical fixed 1920×1080 framing and DOM sizing. |

## Domains in use

```txt
browser shell
fixed-aspect layout
story source descriptors
scene, hotspot and clue identity
mutable story and route state
inspection and clue ledgers
notebook log
scene completion policy
implicit story phase
interlude timer and projection
Continue and terminal policy
side-panel input
raycast input
keyboard reset input
localStorage effects
story and debug projection
Three.js CDN runtime
stage render host
scene descriptor consumption
anime materials
post-process pass
hotspot volumes and picking
camera parallax
render-target composition
live scene replacement
stage resource and RAF lifecycle
syntax validation
static Pages deployment
repo-local and central audit ledgers
```

Missing authority domains:

```txt
versioned story manifest
hotspot manifest index
inspection command normalization
inspection admission
scene/hotspot membership proof
story revision and stage epoch checks
scene-scoped clue provenance
scene completion proof
inspection transaction result
bounded command/result journal
feedback and rendered-frame correlation
behavioral fixture execution
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel and interlude shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, camera, fog, stage, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate inspect, Continue, reset, projection, persistence and StageKit calls. |
| `clue-ledger-kit` | Grant unique global clue strings and evaluate requirements. |
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
| `hotspot-volume-kit` | Build invisible pick meshes with attached full descriptor objects. |
| `hotspot-picking-kit` | Hover and click raycasts that return descriptor payloads. |
| `camera-parallax-kit` | Pointer-driven locked-camera offsets. |
| `render-target-composition-kit` | Stage target plus post-process pass. |
| `debug-json-projection-kit` | Aggregate mutable story-state projection. |
| `package-syntax-check-kit` | Syntax-check the four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Central selection and findings history. |

## Main finding: inspection payloads bypass authority

`inspectHotspot(hotspot)` accepts the object provided by the input surface and trusts these fields:

```txt
id
label
text
changesText
grants
```

It combines them with the mutable `currentScene.id` rather than validating that the object belongs to that scene. No story phase, story revision, stage epoch, command id, input sequence or manifest fingerprint is checked.

Consequences:

```txt
stale old-scene descriptor may mutate new-scene inspection map
caller-supplied grants may enter the global clue array
side-panel and raycast admissions are not deduplicated
re-read requests create repeated log and storage effects
completion has no clue provenance or immutable proof
interlude scheduling has no one-shot transaction result
feedback has no command/result/frame correlation
```

## Required parent domain

```txt
the-unmapped-house-inspection-authority-domain
```

Update the existing story, browser runtime, inspection, clue, hotspot volume, picking, persistence and debug kits first. Add only the missing coordination surfaces:

```txt
inspection-command-envelope-kit
inspection-command-admission-kit
hotspot-manifest-index-kit
hotspot-pick-observation-kit
inspection-result-kit
scene-scoped-clue-grant-kit
scene-completion-proof-kit
inspection-transaction-kit
inspection-journal-kit
inspection-feedback-projection-kit
inspection-frame-correlation-kit
inspection-authority-fixture-kit
```

## Ordered implementation queue

```txt
1. Versioned Story Manifest and StorySnapshot
2. Inspection Command Authority
3. Atomic Story/Stage Continue Transition
4. Runtime Session Lifecycle and Resource Retirement
5. Committed frame and diagnostics proof
```

## Next safe ledge

```txt
TheUnmappedHouse Inspection Command Authority
+ Scene/Hotspot/Clue and Dual-Ingress Fixture Gate
```
