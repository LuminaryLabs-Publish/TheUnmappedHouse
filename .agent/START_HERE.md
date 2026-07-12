# START HERE: The Unmapped House

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Last updated:** `2026-07-12T06-30-34-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence, a fixed 16:9 shell, side-panel inspection buttons and a descriptor-driven Three.js stage.

The current audit isolates modal focus and Continue admission. The interlude remains in the DOM while closed, is hidden only through opacity, `pointer-events: none` and `aria-hidden`, and contains an enabled Continue button. The button is not inert or removed from sequential focus, and its handler calls `nextScene()` without checking scene completion or an open interlude. Keyboard focus can therefore reach and activate hidden Continue, advance scenes without clues, and commit the skipped route.

## Plan ledger

**Goal:** require one modal and keyboard-focus authority so hidden controls are unreachable, open interludes isolate background interaction, and Continue is admitted only from a current completion proof.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `TheUnmappedHouse` as the oldest eligible repository.
- [x] Trace closed interlude state, sequential focus, Continue activation and open-modal background controls.
- [x] Identify all active domains, all 24 implemented kits and offered services.
- [x] Confirm no `inert`, disabled state, focus entry, focus trap, focus return, dialog role or `aria-modal` contract exists.
- [x] Confirm `nextScene()` does not require scene completion, interlude-open state or a completion-proof token.
- [x] Define modal state, focus lease, Continue capability, admission, observation and browser fixture boundaries.
- [x] Refresh required root `.agent` files and add a timestamped audit family.
- [ ] Runtime implementation and executable keyboard/accessibility fixtures remain future work.

## Current interaction loop

```txt
boot
  -> interlude exists in the DOM with aria-hidden=true
  -> CSS sets opacity:0 and pointer-events:none
  -> Continue remains an enabled native button
  -> story and StageKit initialize

normal inspection
  -> inspect hotspots
  -> derive completion from clue strings
  -> after 450 ms, add .open and aria-hidden=false
  -> no focus is moved into the interlude

keyboard path while closed
  -> sequential focus can still reach Continue
  -> Enter or Space dispatches click
  -> nextScene() advances without completion admission

keyboard path while open
  -> no focus trap or background inertness
  -> focus may remain on or return to background inspection controls
  -> background commands remain keyboard-admissible

Continue
  -> derive successor from array order
  -> mutate story and route
  -> replace stage resources
  -> project UI and save
```

## Main finding

```txt
closed interlude removed from focus order: no
closed Continue disabled: no
interlude inert while closed: no
dialog role: absent
aria-modal: absent
focus origin capture: absent
focus entry on open: absent
focus trap: absent
background control suspension: absent
focus return on close: absent
Continue completion guard: absent
Continue interlude-open guard: absent
completion-proof consumption: absent
typed modal/Continue result: absent
keyboard browser fixture: absent
```

The pointer overlay is closed to mouse input, but the keyboard path is independent. `pointer-events: none` does not establish keyboard inertness, and `aria-hidden` alone does not remove a descendant button from native focus navigation.

## Domains in use

```txt
browser shell and fixed-aspect layout
authored story and render descriptors
mutable story state and localStorage effects
scene route, inspection, clues, log and completion
interlude timing and terminal projection
DOM narrative, hotspot-button and debug projection
native keyboard focus and button activation
CSS modal visibility and pointer blocking
Three.js CDN runtime
WebGL renderer, target, stage and post passes
scene replacement and procedural resource allocation
hotspot volumes, picking and camera parallax
resize, input, timeouts and recursive RAF callbacks
repo-local and central audit tracking
syntax checks and Pages deployment
```

Missing or planned authority domains include:

```txt
modal state and generation
hidden-control inertness
focus origin, entry, trap and return
background interaction suspension
Continue capability and command admission
completion-proof consumption
typed modal results and observations
keyboard and assistive-technology fixtures
```

## Implemented kits

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
scene-route-kit
inspection-ledger-kit
clue-ledger-kit
notebook-log-kit
interlude-timer-kit
terminal-route-kit
localstorage-save-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
camera-parallax-kit
render-target-composition-kit
debug-json-projection-kit
package-syntax-check-kit
static-pages-deploy-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

Services cover shell composition, story descriptors, mutable progression, inspection, clue and route tracking, persistence, interlude projection, native button activation, scene construction, materials, picking, parallax, two-pass rendering, narrative/debug projection, validation, deployment and audit tracking.

## Required parent domain

```txt
the-unmapped-house-modal-focus-continue-admission-authority-domain
```

## Required transaction

```txt
OpenInterludeCommand
  -> validate runtime, scene and completion proof
  -> capture focus origin
  -> commit one modal generation
  -> make background controls inert
  -> expose dialog semantics
  -> move focus to the admitted Continue control
  -> publish ModalOpenResult

ContinueCommand
  -> validate modal generation, focus lease and completion proof
  -> consume the proof exactly once
  -> close and retire the modal lease
  -> route through the atomic Continue transition authority
  -> return focus only when the predecessor view remains current
  -> publish ModalContinueResult
```

## Read this pass first

```txt
.agent/trackers/2026-07-12T06-30-34-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T06-30-34-04-00.md
.agent/architecture-audit/2026-07-12T06-30-34-04-00-modal-focus-continue-admission-dsk-map.md
.agent/render-audit/2026-07-12T06-30-34-04-00-hidden-interlude-focus-visible-state-gap.md
.agent/gameplay-audit/2026-07-12T06-30-34-04-00-hidden-continue-scene-skip-loop.md
.agent/interaction-audit/2026-07-12T06-30-34-04-00-modal-focus-command-admission-map.md
.agent/accessibility-audit/2026-07-12T06-30-34-04-00-inert-focus-trap-route-contract.md
.agent/deploy-audit/2026-07-12T06-30-34-04-00-keyboard-modal-fixture-gate.md
```

Do not treat visual opacity or pointer blocking as proof that a control is inactive. Completion requires keyboard-inert closed state, modal focus isolation, proof-admitted Continue and browser/accessibility fixtures.
