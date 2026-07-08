# Current Audit

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Audit timestamp:** `2026-07-08T05:28:26-04:00`

## Summary

`TheUnmappedHouse` is a compact fixed-camera anime horror prototype with a clear point-and-click inspection loop and a reusable-looking Three.js `StageKit`.

The root `.agent/` state exists. This pass is a documentation integrity follow-up: it re-compares the full accessible `LuminaryLabs-Publish` repo list against central tracking, confirms no currently observed non-excluded Publish repo is fully new or missing root `.agent/START_HERE.md` state, and closes the stale repo-local claim that `TheUnmappedHouse` is still outside the central status-summary publish-game rollup.

The next architecture move should still preserve the visible route while extracting story command authority, result contracts, fixtures, and descriptor validation.

## Full repo-list comparison result

Current `LuminaryLabs-Publish` repos observed:

```txt
AetherVale            tracked; root .agent state observed
HorrorCorridor        tracked; root .agent state observed
IntoTheMeadow         tracked; root .agent state observed
MyCozyIsland          tracked; root .agent state observed
PhantomCommand        tracked; root .agent state observed
PrehistoricRush       tracked; root .agent state observed
TheCavalryOfRome      excluded by standing rule
TheOpenAbove          tracked; root .agent state observed
TheUnmappedHouse      selected for stale central-rollup-gap cleanup
ZombieOrchard         tracked; root .agent state observed
```

Selection reason:

```txt
TheUnmappedHouse was selected because all checked non-excluded Publish repos have at least root .agent state, and this repo still carried stale local/central docs saying status-summary publish-game rollup inclusion was pending.

The central status summary now records TheUnmappedHouse in known_repos, active_products, and publish_game_map_from_direct_ledgers under schema 1.18.0.

This is not a root-agent-missing pass and not a product-code pass. It is a follow-up documentation integrity pass to keep repo-local .agent state and central ledger state aligned.
```

## Product surface

```txt
README.md
  -> fixed-camera anime point-and-click horror prototype

index.html
  -> loads ./src/game.js
  -> declares the stage root, story panel, hotspot list, notebook debug panel, hover label, and interlude overlay

src/game.js
  -> owns state load/save
  -> owns clue grants
  -> owns hotspot inspection behavior
  -> owns scene completion and interlude progression
  -> projects UI and notebook debug state

src/stage-kit.js
  -> owns Three.js renderer setup
  -> owns camera, raycaster, lights, render target, post pass
  -> creates layers, props, and hotspot volumes
  -> handles pointer hover/click and animation

src/story-data.js
  -> owns three scene descriptors
  -> defines camera, stage layers, props, post settings, hotspots, clue grants, completion requirements, and interlude text

src/styles.css
  -> owns dark responsive panel, hotspot buttons, hover label, and interlude styling

.github/workflows/deploy.yml
  -> deploys the static site to GitHub Pages from main
```

## Interaction loop

```txt
open static route
  -> load saved state or create initial state
  -> load current scene into StageKit
  -> show story text and hotspot buttons
  -> hover/click hotspot in renderer or click side-panel button
  -> mark hotspot inspected
  -> grant clue(s)
  -> write notebook log
  -> check scene completion
  -> if complete, show interlude
  -> continue to next scene
  -> persist route, clues, inspected map, and log to localStorage
  -> KeyR clears save and reloads
```

## Current domains

```txt
static page shell
static Pages deploy
fixed-camera story runtime
scene descriptor source
story state save/load
story clue ledger
hotspot inspection
scene completion
interlude transition
notebook/debug projection
fixed-camera stage renderer
Three.js render host
stage layer descriptors
stage prop descriptors
hotspot volume descriptors
pointer raycast picking
hover label projection
anime shader material
WebGL post-processing
responsive story panel styling
repo-local .agent operating state
central repo-ledger readback
central status-summary publish-game rollup membership
```

## Current service inventory

```txt
createInitialState
loadState
saveState
hasClue
grantClues
writeLog
sceneComplete
inspectHotspot
showInterlude
nextScene
renderUi
KeyR reset
StageKit constructor
StageKit animeMaterial
StageKit loadScene
StageKit createLayer
StageKit createProp
StageKit createHotspot
StageKit handlePointer
StageKit pick
StageKit clickHotspot
StageKit resize
StageKit animate
static Pages deploy
```

## Current kit inventory

Implemented or implied kits:

```txt
unmapped-house-static-shell-kit
unmapped-house-story-runtime-kit
unmapped-house-story-data-kit
unmapped-house-story-state-save-kit
unmapped-house-clue-ledger-kit
unmapped-house-scene-completion-kit
unmapped-house-interlude-overlay-kit
unmapped-house-notebook-debug-kit
unmapped-house-stage-kit
unmapped-house-fixed-camera-diorama-kit
unmapped-house-stage-layer-kit
unmapped-house-stage-prop-kit
unmapped-house-stage-hotspot-volume-kit
unmapped-house-hotspot-raycast-kit
unmapped-house-hover-label-kit
unmapped-house-anime-material-shader-kit
unmapped-house-stage-postprocess-kit
unmapped-house-static-pages-deploy-kit
unmapped-house-agent-state-kit
unmapped-house-central-ledger-readback-kit
unmapped-house-status-summary-rollup-membership-kit
```

Needed next-cut kits:

```txt
unmapped-house-story-source-snapshot-kit
unmapped-house-stage-scene-snapshot-kit
unmapped-house-story-command-envelope-kit
unmapped-house-command-validation-kit
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-save-result-kit
unmapped-house-route-journal-kit
unmapped-house-command-journal-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-stage-descriptor-validation-kit
```

## Architectural diagnosis

The main issue is not that the project lacks a loop.

The issue is that the loop is not yet divided into reusable, testable authority units.

Current risk:

```txt
DOM event -> direct mutation -> direct localStorage write -> direct UI projection
```

Preferred next shape:

```txt
DOM event
  -> command envelope
  -> pure reducer / authority service
  -> result record
  -> journal entry
  -> save adapter
  -> UI projection
```

## Documentation diagnosis

The repo-local `.agent/` folder exists and includes required audit files, tracker entries, and turn ledger entries.

The central ledger has a `repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md` file and internal change-log entries for the root-agent-state and central-readback passes.

The central status-summary rollup gap is closed in `repo-checks/reports/status-summary.json` schema `1.18.0`; it includes `TheUnmappedHouse` in the publish-game map from direct ledgers. The direct repo ledger and repo-local docs are being refreshed by this pass so future selector logic does not keep returning to this repo only because old docs describe a lagging rollup.

## Recommended next implementation objective

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

Do this before expanding the story or renderer.
