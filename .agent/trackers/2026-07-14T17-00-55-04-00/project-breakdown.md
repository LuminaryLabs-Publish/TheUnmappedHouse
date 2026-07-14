# Project breakdown: The Unmapped House interlude focus and route admission

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `interlude-focus-route-admission-authority-audited`

## Summary

The visual interlude behaves like a modal overlay for pointer users, but it is not an admitted modal interaction state. Its Continue button remains keyboard-focusable while the overlay is visually hidden, `nextScene()` does not verify scene completion, and background inspection controls remain focusable while the overlay is open. Keyboard focus can therefore bypass clue progression or continue mutating the predecessor scene behind the visible interlude.

## Plan ledger

**Goal:** make interlude opening, focus ownership, command admission, scene advancement and first visible successor evidence one coherent transaction.

- [x] Compare all 11 accessible Publish repositories with ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm every eligible repository head matches its recorded documentation head.
- [x] Select only `TheUnmappedHouse` by the oldest synchronized central timestamp.
- [x] Trace hidden Continue focus, background controls, global reset, completion checks and route advancement.
- [x] Identify the interaction loop, domains, all 24 implemented kits and their services.
- [x] Define the missing interlude focus and route authority.
- [x] Add timestamped architecture, render, gameplay, interaction, accessibility, deploy and central-sync audits.
- [x] Change documentation only.
- [ ] Implement and execute keyboard, screen-reader, focus and route-bypass fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected repository: TheUnmappedHouse
selection reason: oldest synchronized central documentation timestamp
prior timestamp: 2026-07-14T11-59-13-04-00
```

## Complete interaction loop

```txt
boot
  -> load shallow-merged browser state
  -> resolve current scene
  -> construct Three.js stage and recursive RAF
  -> render scene text, Notebook and hotspot buttons
  -> keep hidden interlude Continue button in the document focus order

inspection
  -> canvas raycast or DOM button calls inspectHotspot
  -> mark inspected, grant clues, update log and save
  -> when complete, schedule interlude after 450 ms

interlude presentation
  -> add .open and set aria-hidden=false
  -> pointer overlay blocks clicks to the background
  -> focus is not moved to Continue
  -> background buttons remain tabbable and actionable

route continuation
  -> any Continue click calls nextScene
  -> nextScene does not require sceneComplete(currentScene)
  -> hidden keyboard activation can advance before clues
  -> focus ownership and successor-frame evidence are not published
```

## Source ownership

| Source | Current responsibility |
|---|---|
| `index.html` | Stage shell, live story panel, hotspot list, Notebook, hover label and interlude markup. |
| `src/styles.css` | Visually hidden/visible interlude states using opacity and pointer events. |
| `src/game.js` | Story state, completion, interlude opening, Continue command, route advancement, persistence and reset. |
| `src/story-data.js` | Three scenes, nine required hotspots, clue gates and presentation descriptors. |
| `src/stage-kit.js` | Three.js rendering, canvas picking, hover and parallax. |
| `src/aspect-frame.js` | Fixed 16:9 viewport calculation and placement. |
| `package.json` | Syntax-only validation. |

## Domains in use

```txt
static browser shell and document semantics
keyboard, focus, pointer and canvas interaction
modal and background interaction admission
story manifest, inspections, clues, completion and route progression
interlude timing and presentation
terminal route presentation
browser persistence and reset
fixed-aspect viewport
Three.js renderer, shaders and post-processing
hotspot volumes, raycast picking and camera parallax
render-target composition and visible-frame evidence
accessibility semantics and focus restoration
syntax validation and static Pages deployment
repo-local and central audit governance
```

## Implemented kits and offered services

```txt
static-page-shell-kit
  stage mount, story panel, hotspot list, Notebook, hover label, interlude

aspect-frame-kit
  fixed design aspect, window-fit calculation, DOM frame placement

story-data-kit
  scene descriptors, hotspots, clue grants, completion rules, camera, materials, post descriptors

browser-story-runtime-kit
  state boot, scene resolution, inspection, continue, reset, UI projection, persistence calls

scene-route-kit
  scene ID resolution, authored-order advancement

inspection-ledger-kit
  scene-keyed inspected hotspot state

clue-ledger-kit
  clue grant, clue query

notebook-log-kit
  prepend narrative log, bounded retention

interlude-timer-kit
  delayed completion interlude

terminal-route-kit
  prototype-complete DOM projection

localstorage-save-kit
  parse, shallow merge, replace, delete save

stage-render-kit
  WebGL renderer, scene, camera, lights, offscreen target, callbacks, recursive RAF

scene-descriptor-consumer-kit
  camera, geometry, material, hotspot and post construction

anime-material-kit
  procedural shader materials, elapsed-time updates

post-process-kit
  grain, vignette, chromatic shift, distortion, scan lines

hotspot-volume-kit
  invisible raycast volumes, descriptor attachment

hotspot-picking-kit
  coordinate normalization, raycast, hotspot dispatch

camera-parallax-kit
  pointer-driven fixed-camera offsets

render-target-composition-kit
  offscreen stage pass, post pass, target sizing

debug-json-projection-kit
  story-field serialization, Notebook projection

package-syntax-check-kit
  Node syntax checks

static-pages-deploy-kit
  static Pages delivery

repo-local-agent-ledger-kit
  root pointers, timestamped audit records

central-ledger-sync-kit
  central selection mirror, central findings history
```

```txt
implemented source-backed kits: 24
planned focus/route authority surfaces: 20
```

## Main findings

```txt
hidden interlude removed from pointer input: yes
hidden interlude removed from keyboard focus: no
Continue disabled while hidden: no
Continue route command completion guard: no
modal role and aria-modal: absent
focus moved to Continue on open: absent
background controls made inert: absent
focus restored after advancement: absent
global reset gated by modal state: no
focus/route command identity: absent
first focus-stable successor frame acknowledgement: absent
keyboard and screen-reader fixtures: absent
```

## Required authority

```txt
the-unmapped-house-interlude-focus-route-admission-authority-domain
```

```txt
InterludeOpenCommand
  -> bind story, scene, completion, route and focus revisions
  -> require accepted scene-completion evidence
  -> prepare semantic modal and inert-background candidates
  -> capture prior focus owner
  -> atomically open the interlude and move focus to Continue
  -> publish InterludeOpenResult

InterludeContinueCommand
  -> require the active interlude and matching completed scene
  -> reject hidden, stale, duplicate or premature activation
  -> prepare successor scene, route, stage and focus candidates
  -> atomically advance or preserve every predecessor
  -> close the modal and restore an authored successor focus target
  -> publish InterludeContinueResult
  -> publish FirstFocusStableSceneFrameAck
```

## Validation boundary

Documentation and machine audit state changed. Runtime JavaScript, HTML, CSS, story content, persistence, rendering, package scripts, dependencies, workflows and deployment did not change. No browser, keyboard, screen-reader, build or Pages fixture was executed.