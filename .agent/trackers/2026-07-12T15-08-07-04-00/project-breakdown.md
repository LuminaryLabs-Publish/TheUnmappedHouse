# Project breakdown: The Unmapped House Notebook Observability Projection Authority

**Timestamp:** `2026-07-12T15-08-07-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`

## Summary

This documentation-only breakdown selects `TheUnmappedHouse` by the oldest documented-selection rule. The visible player `Notebook` is currently a raw developer-style JSON view of internal story state. The audit preserves the full interaction, domain, kit and service inventory, then defines a bounded authority for channel admission, field classification, redaction, projection commit and visible proof.

## Plan ledger

**Goal:** separate authored player notes from developer diagnostics without losing useful observability.

- [x] Compare the complete Publish repository inventory with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no eligible repository is new, ledger-missing or root-`.agent`-missing.
- [x] Select only `TheUnmappedHouse` as the oldest eligible synchronized repository.
- [x] Read root `.agent` state and the latest source-backed audits.
- [x] Read `index.html`, `src/styles.css`, `src/game.js`, `src/story-data.js` and `src/stage-kit.js`.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all 24 implemented kits.
- [x] Identify the services offered by each kit.
- [x] Define the notebook-observability authority and proof gates.
- [x] Refresh required root `.agent` files.
- [x] Add timestamped architecture and system-specific audits.
- [x] Push only to `main` with no branch or pull request.
- [ ] Implement and execute the authority later.

## Organization comparison

```txt
LuminaryLabs-Publish/AetherVale         tracked, root .agent present
LuminaryLabs-Publish/HorrorCorridor     tracked, root .agent present
LuminaryLabs-Publish/IntoTheMeadow      tracked, root .agent present
LuminaryLabs-Publish/MyCozyIsland       tracked, root .agent present
LuminaryLabs-Publish/PhantomCommand     tracked, root .agent present
LuminaryLabs-Publish/PrehistoricRush    tracked, root .agent present
LuminaryLabs-Publish/TheOpenAbove       tracked, root .agent present
LuminaryLabs-Publish/TheUnmappedHouse   tracked, root .agent present, selected
LuminaryLabs-Publish/ZombieOrchard      tracked, root .agent present
LuminaryLabs-Publish/TheCavalryOfRome   excluded
```

Ordered eligible central timestamps:

```txt
TheUnmappedHouse   2026-07-12T13-08-15-04-00 selected
AetherVale         2026-07-12T13-20-00-04-00
TheOpenAbove       2026-07-12T13-29-56-04-00
IntoTheMeadow      2026-07-12T13-54-00-04-00
PhantomCommand     2026-07-12T13-59-50-04-00
PrehistoricRush    2026-07-12T14-10-22-04-00
HorrorCorridor     2026-07-12T14-30-36-04-00
ZombieOrchard      2026-07-12T14-38-35-04-00
MyCozyIsland       2026-07-12T14-59-01-04-00
```

## Complete interaction loop

```txt
boot
  -> parse one localStorage record
  -> resolve current scene
  -> create StageKit and load the scene
  -> render title, narrative and hotspot controls
  -> serialize internal aggregate fields into the visible Notebook
  -> save aggregate state

canvas hover
  -> normalize pointer against canvas bounds
  -> raycast current hotspot volumes
  -> project hover label

canvas click
  -> raycast current hotspot volumes
  -> dispatch full hotspot descriptor
  -> inspect hotspot

side-panel click
  -> dispatch the same full hotspot descriptor without raycast evidence
  -> inspect hotspot

inspection
  -> mutate current-scene inspected map
  -> grant internal clue ids
  -> update narrative and capped log
  -> derive exact scene completion
  -> optionally schedule delayed interlude
  -> rebuild hotspot controls
  -> serialize internal state into Notebook
  -> persist aggregate state

Continue
  -> resolve next authored scene
  -> mutate scene and route ids
  -> close interlude
  -> replace live stage scene
  -> rebuild story and Notebook projection
  -> persist aggregate state

render frame
  -> update camera parallax and shader time
  -> render scene to offscreen target
  -> render post pass to default framebuffer
  -> publish no notebook or frame provenance

reset
  -> remove localStorage key
  -> reload the page
```

## Domains in use

```txt
browser application shell
fixed-aspect composition
authored story and render descriptors
mutable story aggregate
raw browser persistence
scene routing
inspection ledger
clue ledger
route and notebook log
completion derivation
completion timer
interlude and terminal projection
canvas raycast interaction
side-panel interaction
global keyboard reset
native button focus and activation
player-visible Notebook shell
raw aggregate JSON diagnostics
Three.js/WebGL presentation
scene resource materialization
procedural geometry and shader materials
post processing
camera parallax
resize and recursive RAF
syntax validation
static Pages deployment
repo-local audit ledger
central ledger synchronization
```

## Implemented kits and services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Mount stage, story panel, hotspot list, visible Notebook, hover label and interlude. |
| `aspect-frame-kit` | Compute and apply fixed 16:9 CSS bounds. |
| `story-data-kit` | Provide three scenes, nine hotspots, clue requirements, narrative and render descriptors. |
| `browser-story-runtime-kit` | Load state, route, inspect, complete, continue, reset, project and persist. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track inspected hotspot booleans by scene. |
| `clue-ledger-kit` | Grant and query internal clue ids. |
| `notebook-log-kit` | Prepend and cap player-readable log entries. |
| `interlude-timer-kit` | Schedule delayed completion interlude. |
| `terminal-route-kit` | Project terminal prototype-complete copy. |
| `localstorage-save-kit` | Parse, merge, write and delete one save record. |
| `stage-render-kit` | Create renderer, camera, lights, target, listeners and RAF. |
| `scene-descriptor-consumer-kit` | Convert authored scene descriptors to live Three.js objects. |
| `anime-material-kit` | Create shader materials and advance time uniforms. |
| `post-process-kit` | Apply grain, vignette, chromatic, distortion and scan-line effects. |
| `hotspot-volume-kit` | Create invisible pick volumes carrying hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click interactions. |
| `camera-parallax-kit` | Apply pointer-driven camera offsets. |
| `render-target-composition-kit` | Submit scene and post passes. |
| `debug-json-projection-kit` | Serialize internal aggregate fields into the visible Notebook. |
| `package-syntax-check-kit` | Parse-check four JavaScript sources. |
| `static-pages-deploy-kit` | Publish the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain the organization-wide repository ledger and change log. |

## Main finding

The HTML and CSS establish `#state-debug` as a normal visible Notebook surface. `renderUi()` then serializes:

```txt
game
scene
clues
route
inspected
complete
latest
```

This makes internal ids and aggregate structure part of the player UI. It also merges two separate products:

```txt
player notebook
  -> authored narrative entries and player-safe progress

developer diagnostics
  -> scene ids, clue ids, route ids, booleans and aggregate observations
```

There is no explicit channel, build gate, capability, classification, redaction, result or frame acknowledgement.

## Required DSK/domain

```txt
the-unmapped-house-notebook-observability-projection-authority-domain
```

Responsibilities:

```txt
projection identity and revision
story revision and scene generation binding
player/developer/support channel policy
build and capability admission
field classification
redaction profile identity and revision
player notebook entry model
developer diagnostic model
projection plan, commit and typed result
stale projection rejection
visible notebook frame acknowledgement
observations and bounded journal
browser and Pages fixture gates
```

## Validation boundary

```txt
runtime source changed: no
story content changed: no
Notebook behavior changed: no
diagnostic behavior changed: no
render behavior changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser notebook smoke: not run
Pages notebook smoke: not run
```

No production-safe notebook, diagnostic isolation or deployment-readiness claim is made.