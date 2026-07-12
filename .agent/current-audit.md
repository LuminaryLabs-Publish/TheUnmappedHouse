# Current audit: The Unmapped House

Timestamp: `2026-07-12T00-01-25-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, a 450 ms completion interlude, browser persistence, a fixed 16:9 shell, side-panel inspection buttons and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** make narrative copy a typed runtime projection that stays coherent with story state, scene resources, hotspot lists, persistence and the first visible frame.

- [x] Trace boot, scene opening, hotspot inspection, completion interlude, Continue, terminal and reload copy behavior.
- [x] Confirm `#scene-text` is used as both visual output and hidden state input.
- [x] Confirm a successor scene can retain predecessor hotspot copy.
- [x] Inventory all active domains, all 24 implemented kits and their services.
- [x] Define narrative source, projection, revision, admission, commit, persistence, DOM, accessibility, observation and fixture boundaries.
- [ ] Implement the upstream StoryManifest, StorySnapshot, inspection, transition and narrative authorities.
- [ ] Execute narrative transition and visible-frame parity fixtures.

## Interaction loop

```txt
module evaluation
  -> export gameTitle and scenes
  -> load raw localStorage state
  -> select persisted scene or visually fall back to scenes[0]
  -> allocate StageKit
  -> load current stage
  -> render opening copy only when #scene-text is empty or Loading

inspection
  -> inspectHotspot(hotspot descriptor)
  -> write hotspot.text directly into #scene-text
  -> mutate inspected and clue ledgers
  -> update log
  -> optionally schedule completion interlude
  -> render buttons/debug without replacing body copy
  -> save raw state

Continue
  -> select scenes[index + 1]
  -> mutate currentScene, state.sceneId and route
  -> close interlude
  -> load successor stage
  -> update title, hotspot buttons and debug
  -> leave predecessor hotspot copy in #scene-text
  -> save successor state

reload
  -> DOM body starts empty
  -> saved scene opening copy is projected
  -> exact prior narrative projection is not restored
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, `aria-live` story panel, hotspot list, debug panel, interlude and Continue button. |
| `src/story-data.js` | Authored opening, hotspot, interlude, stage, camera, material, post, requirement and clue descriptors. |
| `src/game.js` | Raw load/save, mutable story state, direct narrative DOM writes, completion timing, array-order Continue and projection. |
| `src/stage-kit.js` | Three.js renderer, stage resources, hotspot meshes, picking, camera parallax, resize and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and CSS frame fitting. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect layout
authored story and narrative descriptors
raw localStorage and mutable story state
scene route, inspection, clues, flags and notebook log
ambient DOM narrative state
scene completion, interlude timing, Continue and terminal projection
DOM, aria-live, hover, interlude and debug projection
Three.js CDN runtime
WebGL renderer, scene, camera, lights, target and post composition
live scene replacement and procedural geometry allocation
procedural anime shader materials
hotspot volume construction and descriptor-bearing userData
mousemove observation, canvas click and side-panel activation
pointer camera parallax
resize event admission and render-surface mutation
recursive RAF and visible frame submission
runtime callback and resource lifecycle
syntax validation and static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
canonical StoryManifest and content provenance
versioned StorySnapshot startup admission
canonical pointer and inspection results
atomic Continue transition
narrative projection identity, source and revision
narrative persistence policy
narrative DOM and aria-live adapters
story/narrative/stage/frame commit correlation
runtime session and resource lifecycle
render surface and WebGL context recovery
committed-frame diagnostics
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, interlude and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, opening, hotspot, clue, stage, camera, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Load, inspection, completion, Continue, reset, projection, persistence and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without durable terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write and clear raw browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, target, post scene, canvas, listeners and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Build procedural shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected descriptors. |
| `camera-parallax-kit` | Apply mouse-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: DOM copy is ambient story authority

### Opening copy depends on current DOM contents

`renderUi()` sets `currentScene.openingText` only when the body is empty or equals `Loading`. Runtime behavior therefore depends on prior visual output.

### Inspection bypasses a narrative state model

`inspectHotspot()` writes `hotspot.text` directly to `#scene-text`. No projection id, source kind, scene id, story revision or typed result is recorded.

### Continue can create a split frame

`nextScene()` changes the scene, route, stage, title, hotspot list and save, but does not reset the story body. The successor scene can display predecessor hotspot text until another inspection or reload.

### Reload follows a different implicit policy

A reload recreates an empty DOM and displays the saved scene opening. In-session Continue may retain predecessor copy. The product therefore has two inconsistent and undocumented narrative restoration policies.

### Accessibility output has no commit boundary

The story panel is `aria-live="polite"`, but there is no revision or commit receipt proving which scene or result an announcement represents.

## Required parent domain

```txt
the-unmapped-house-narrative-projection-authority-domain
```

Candidate kits:

```txt
narrative-source-kind-kit
narrative-source-id-kit
narrative-projection-state-kit
narrative-projection-revision-kit
scene-opening-projection-kit
hotspot-copy-projection-kit
completion-copy-projection-kit
terminal-copy-projection-kit
narrative-projection-admission-kit
narrative-projection-commit-kit
narrative-projection-result-kit
narrative-persistence-policy-kit
scene-transition-narrative-reset-kit
narrative-dom-adapter-kit
narrative-aria-live-adapter-kit
narrative-frame-acknowledgement-kit
narrative-observation-kit
narrative-journal-kit
narrative-projection-fixture-kit
transition-copy-parity-fixture-kit
```

## Required projection shape

```txt
NarrativeProjection
  projectionId
  revision
  sceneId
  phase
  sourceKind
  sourceId
  title
  body
  persistencePolicy
  committedByResultId
  storyRevision
  acknowledgedFrameId
```

## Required authority flow

```txt
accepted inspection, completion, transition or terminal result
  -> resolve canonical narrative source
  -> prepare projection candidate
  -> validate scene, phase, source and story revision
  -> commit with the owning story transaction
  -> project through one DOM and aria-live adapter
  -> submit first correlated frame
  -> publish acknowledgement and detached observation
```

## Ordered implementation queue

```txt
1. StoryManifest Authority
2. StorySnapshot startup admission and typed persistence
3. Pointer Observation and Hotspot Pick Authority
4. Inspection and scene-completion proof
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime session lifecycle and scene-resource retirement
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse Narrative Projection Authority
+ Scene Opening / Hotspot / Completion / Terminal Source Identity
+ Transition Copy Parity / Persistence Policy / First-Frame Fixture Gate
```

## Validation status

The authority is not implemented. No current test proves that title, body, stage, hotspot list, saved scene and first visible frame agree after Continue.
