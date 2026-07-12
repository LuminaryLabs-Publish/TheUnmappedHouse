# Current audit: The Unmapped House

**Timestamp:** `2026-07-12T06-30-34-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

The current audit isolates modal focus and Continue admission. `index.html` keeps the interlude and Continue button mounted at all times. Closed state is expressed with `aria-hidden="true"`, opacity zero and `pointer-events: none`, but the button is never disabled, made inert or removed from sequential focus. `src/game.js` attaches an unconditional click handler to `nextScene()`, and `nextScene()` does not verify scene completion, an open interlude or an unconsumed completion proof.

## Plan ledger

**Goal:** define one authoritative modal/focus transaction from completion proof through interlude visibility, keyboard isolation, Continue admission and focus retirement.

- [x] Compare the full Publish inventory against central ledger state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` from the oldest eligible central timestamp.
- [x] Inspect `index.html`, `src/styles.css`, `src/game.js`, `src/stage-kit.js` and current audit state.
- [x] Trace native focus behavior for closed and open interlude states.
- [x] Confirm opacity, pointer blocking and `aria-hidden` do not create a disabled keyboard state.
- [x] Confirm Continue has no completion or modal-generation admission guard.
- [x] Inventory all active domains, all 24 implemented kits and offered services.
- [x] Define modal, focus, Continue capability, command, result, observation and fixture kits.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheUnmappedHouse    2026-07-12T04-44-36-04-00 selected
AetherVale          2026-07-12T04-50-41-04-00
MyCozyIsland        2026-07-12T05-00-19-04-00
TheOpenAbove        2026-07-12T05-11-46-04-00
PrehistoricRush     2026-07-12T05-21-52-04-00
IntoTheMeadow       2026-07-12T05-39-42-04-00
PhantomCommand      2026-07-12T05-49-04-04-00
HorrorCorridor      2026-07-12T05-59-28-04-00
ZombieOrchard       2026-07-12T06-19-56-04-00
TheCavalryOfRome    excluded
```

## Product and interaction loop

```txt
module boot
  -> mount stage, story panel and interlude DOM
  -> interlude starts aria-hidden=true
  -> closed CSS sets opacity:0 and pointer-events:none
  -> Continue remains an enabled button in document order
  -> load state, stage and UI

inspection
  -> canvas or side-panel activation calls inspectHotspot()
  -> mutate inspection, clues, log and narrative
  -> if complete, schedule showInterlude() after 450 ms

showInterlude
  -> write completion copy
  -> add .open
  -> set aria-hidden=false
  -> does not capture current focus
  -> does not move focus into the interlude
  -> does not make background controls inert

hidden keyboard path
  -> Tab navigation can reach Continue while closed
  -> Enter or Space dispatches click
  -> nextScene() advances without completion proof

open keyboard path
  -> focus can remain in background or traverse background controls
  -> background inspection commands remain keyboard reachable

Continue
  -> derive successor by scene-array order
  -> mutate current scene, route and log
  -> replace stage resources
  -> project UI and save
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, story panel, mounted interlude and native Continue control. |
| `src/styles.css` | Closed/open interlude appearance and pointer routing. |
| `src/game.js` | Mutable story state, completion timeout, interlude projection, unconditional Continue handler and scene transition. |
| `src/story-data.js` | Scene, hotspot, clue, stage and post descriptors. |
| `src/stage-kit.js` | Three.js resource graph, canvas pointer input, scene loading and frame submission. |
| `src/aspect-frame.js` | Fixed 1920 by 1080 composition. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect composition
authored story, scene, hotspot and render descriptors
raw localStorage read, write and reset effects
mutable story snapshot ownership
scene route, inspection, clue, flags and log
completion and unretained interlude timing
DOM narrative and debug projection
native sequential focus and button activation
CSS modal visibility and pointer-event routing
Three.js CDN runtime
WebGL renderer, target, scene, camera, lights and post composition
live scene replacement and procedural resource allocation
hotspot volumes, raycasting and camera parallax
resize, input, timeouts and recursive RAF callbacks
syntax validation, Pages deployment and audit tracking
```

Missing authority domains:

```txt
modal state and generation
closed-state inertness
modal dialog semantics
focus origin capture
focus entry, trap and return
background interaction suspension
Continue capability
Continue command admission
completion-proof consumption
modal and Continue typed results
focus observation and bounded journal
keyboard and assistive-technology fixture gate
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, mounted interlude and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, stage, camera, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Load, inspection, completion, Continue, reset-by-reload, projection, persistence and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without durable terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write and clear raw browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, target, post scene, canvas, listeners and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Allocate procedural shader materials and advance time uniforms. |
| `post-process-kit` | Allocate and render grain, vignette, chromatic, distortion, memory and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected descriptors. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate story state into the notebook panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding

### Closed visual state is not a closed keyboard state

The interlude is always mounted. Closed state changes opacity, pointer handling and `aria-hidden`, but does not set `inert`, `hidden`, `disabled`, `tabindex="-1"` or any equivalent focus policy on Continue.

### Continue has no admission predicate

The native button click handler calls `nextScene()` directly. `nextScene()` derives the next array entry and mutates route and stage state without checking `sceneComplete(currentScene)`, `interlude.classList.contains("open")` or an immutable completion proof.

### Open interlude is not modal to keyboard users

The interlude has no `role="dialog"` or `aria-modal="true"`. Opening does not capture focus origin, focus Continue, trap focus, suspend background inspection buttons or restore focus on close.

### Reachable bypass

```txt
fresh scene with zero required clues
  -> press Tab until hidden Continue receives focus
  -> press Enter or Space
  -> browser dispatches click
  -> nextScene() advances and saves successor scene
  -> repeat to reach terminal copy without inspections
```

This is a source-level reachability finding. No browser execution is claimed in this documentation-only run.

## Required parent domain

```txt
the-unmapped-house-modal-focus-continue-admission-authority-domain
```

Candidate kits:

```txt
modal-state-kit
modal-generation-kit
modal-open-command-kit
modal-close-command-kit
modal-visibility-adapter-kit
hidden-control-inertness-kit
focus-origin-capture-kit
modal-focus-entry-kit
modal-focus-trap-kit
modal-focus-return-kit
background-interaction-suspension-kit
continue-capability-kit
continue-command-kit
continue-command-admission-kit
scene-completion-proof-consumption-kit
modal-command-result-kit
modal-focus-observation-kit
modal-focus-journal-kit
hidden-continue-fixture-kit
open-modal-background-activation-fixture-kit
keyboard-modal-browser-smoke-kit
screen-reader-modal-contract-fixture-kit
```

## Required transaction

```txt
SceneCompletionProof
  -> admit OpenInterludeCommand for current scene and runtime generation
  -> capture focus origin
  -> commit modal generation
  -> make background stage and story controls inert
  -> expose role=dialog and aria-modal=true
  -> focus the admitted Continue control
  -> constrain sequential focus to the modal
  -> publish ModalOpenResult

ContinueCommand
  -> cite modal generation and current completion proof
  -> reject hidden, stale, duplicate or unproven activation
  -> consume completion proof exactly once
  -> retire modal focus lease
  -> route through Atomic Continue Transition
  -> restore focus only if predecessor UI remains current
  -> publish ModalContinueResult and bounded journal row
```

## Ordered implementation queue

```txt
1. StoryManifest Authority
2. StorySnapshot Startup Authority
2a. Browser Storage Commit and Cross-Tab Convergence Authority
3. Pointer and Hotspot-Pick Authority
4. Inspection and Completion Authority
4a. Modal Focus and Continue Admission Authority
5. Atomic Continue Transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed Frame Diagnostics Authority
```

## Validation boundary

Documentation only. Runtime source, story content, focus behavior, modal semantics, transitions, rendering, package scripts, dependencies and deployment were not changed. No browser fixture currently proves hidden-control inertness, modal focus isolation, completion-gated Continue or assistive-technology semantics.
