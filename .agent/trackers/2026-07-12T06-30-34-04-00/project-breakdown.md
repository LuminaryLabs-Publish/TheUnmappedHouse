# Project breakdown: The Unmapped House modal focus and Continue admission

**Timestamp:** `2026-07-12T06-30-34-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Change type:** documentation only

## Summary

`TheUnmappedHouse` was selected after comparing the complete accessible `LuminaryLabs-Publish` organization inventory with the central `LuminaryLabs-Dev/LuminaryLabs` ledger and repo-local `.agent` state. No eligible repository was new, ledger-missing or root-`.agent`-missing, so the oldest documented-selection rule selected TheUnmappedHouse.

The current source keeps the interlude and Continue button mounted while closed. CSS hides the overlay visually and from pointer input but does not disable or inert the button. `aria-hidden` does not establish native keyboard inertness. The Continue handler calls `nextScene()` directly, and `nextScene()` does not require current scene completion or an open modal. A keyboard user can therefore activate hidden Continue and skip the story.

## Plan ledger

**Goal:** document one modal focus and Continue-admission authority that makes closed controls unreachable, open interludes keyboard-modal and Continue dependent on a current completion proof.

- [x] List all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repos with central timestamps.
- [x] Confirm all nine have central ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse`.
- [x] Read root `.agent` entrypoints and current implementation queue.
- [x] Read `index.html`, `src/styles.css`, `src/game.js`, `src/stage-kit.js` and existing central audit history.
- [x] Trace closed interlude, open interlude, native focus, Continue and scene transition paths.
- [x] Identify all active domains.
- [x] Identify all 24 implemented kits.
- [x] Identify every service family offered by those kits.
- [x] Define the parent authority and 22 candidate kits.
- [x] Define pure DOM, browser keyboard and assistive-technology fixture gates.
- [x] Update root and timestamped `.agent` documentation.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
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

## Product interaction loop

```txt
boot
  -> mount fixed 16:9 shell
  -> mount story panel and interlude
  -> initialize local state and current scene
  -> construct StageKit and recursive render loop
  -> load stage and project UI
  -> save state

inspect by canvas or side panel
  -> identify hotspot
  -> mutate inspected map, clues and log
  -> update body copy
  -> derive scene completion
  -> schedule interlude open after 450 ms when complete
  -> render UI and save

closed interlude
  -> opacity:0
  -> pointer-events:none
  -> aria-hidden=true
  -> Continue remains enabled and focusable

open interlude
  -> opacity:1
  -> pointer-events:auto
  -> aria-hidden=false
  -> no focus move, trap, return or background inertness

Continue activation
  -> direct click handler calls nextScene()
  -> no completion or open-state predicate
  -> mutate scene and route
  -> replace stage
  -> render UI and save

reset
  -> remove storage key
  -> reload page
```

## Domains in use

```txt
browser application shell
fixed 16:9 aspect composition
authored story, scene, hotspot and render descriptors
raw localStorage state effects
mutable story state
scene route, inspection, clues, flags, route and log
scene completion and interlude timing
interlude visibility and terminal projection
native sequential focus and button activation
CSS pointer-event routing
DOM narrative, hotspot-list and debug projection
Three.js CDN runtime
WebGL renderer and render target
stage scene, camera, lights and post processing
procedural geometry and anime materials
hotspot volumes and raycast picking
camera parallax
resize, timeout, input and RAF callbacks
syntax validation
static Pages deployment
repo-local audit tracking
central ledger synchronization
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

## Services offered by implemented kits

### Shell and composition

```txt
fixed game frame
stage surface
story and notebook panels
hotspot button list
hover label
mounted interlude overlay
native Continue control
```

### Story and progression

```txt
scene and hotspot descriptors
current scene routing
inspection tracking
clue granting and lookup
route history
bounded notebook log
scene completion derivation
interlude copy and timing
terminal copy
```

### Persistence

```txt
single-key localStorage read
JSON parse with default fallback
full-state write
key removal and reload reset
```

### Interaction

```txt
canvas mouse move and click
raycast hotspot picking
side-panel native button activation
native Continue click
global KeyR reset
pointer-driven camera parallax
```

### Rendering

```txt
Three.js renderer, scene, camera and lights
procedural plane, box and cylinder construction
anime shader materials
invisible hotspot volumes
stage-to-target render pass
post-process-to-canvas render pass
resize and DPR handling
recursive RAF submission
```

### Projection and delivery

```txt
scene title and body copy
inspection button labels
interlude and terminal copy
debug JSON
syntax checks
static GitHub Pages deployment
repo-local and central audit records
```

## Main source finding

`index.html` contains the interlude and Continue button unconditionally. `src/styles.css` closes the interlude with opacity and pointer blocking. `src/game.js` opens it by changing class and `aria-hidden`, but never changes native focus eligibility. The Continue listener is always installed and `nextScene()` has no completion predicate.

```txt
fresh scene
  -> no required clues
  -> keyboard reaches hidden Continue
  -> Enter or Space dispatches click
  -> nextScene() selects successor
  -> route and stage advance
  -> save commits skipped progression
```

When the interlude is open, background inspection buttons remain in the tab sequence because no ancestor is inert and no controls are disabled. The overlay is pointer-modal but not keyboard-modal.

## Required parent authority

```txt
the-unmapped-house-modal-focus-continue-admission-authority-domain
```

## Candidate kits

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

## Required invariants

```txt
closed interlude contributes no focusable or activatable controls
open interlude is the only admitted keyboard interaction region
background inspection and stage commands are suspended while open
focus enters the dialog and remains contained
focus return is generation-checked
Continue requires current scene completion proof
Continue consumes the proof exactly once
stale and duplicate modal commands produce zero story mutation
modal and transition observations are detached and bounded
```

## Validation boundary

```txt
runtime source changed: no
story content changed: no
focus behavior changed: no
modal semantics changed: no
transition behavior changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser keyboard smoke: not run
assistive-technology smoke: not run
```

No modal-focus, hidden-control inertness, Continue-admission or scene-skip-prevention claim is made.
