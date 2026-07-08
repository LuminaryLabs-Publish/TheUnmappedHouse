# Project Breakdown — Status Rollup Gap Follow-up

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T03:42:00-04:00`

**Branch:** `main`

## Plan ledger

**Goal:** Re-run the Publish repo selection rule, confirm whether any non-Cavalry repo is new or missing root `.agent` state, then update `TheUnmappedHouse` as the remaining central-rollup normalization case without touching runtime behavior.

**Checklist**

- [x] Enumerate the current `LuminaryLabs-Publish` repo list.
- [x] Compare that list against central `LuminaryLabs-Dev/LuminaryLabs` readback and repo-ledger state.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome` by standing rule.
- [x] Confirm non-excluded checked repos now have root `.agent/START_HERE.md` state.
- [x] Select one repo only.
- [x] Identify interaction loop.
- [x] Identify current domains.
- [x] Identify current services.
- [x] Identify implemented/implied kits and needed next-cut kits.
- [x] Record the central status-summary rollup gap.
- [x] Preserve runtime files and visible route.
- [x] Add this timestamped tracker entry.
- [x] Add a timestamped turn-ledger entry.
- [x] Update central `LuminaryLabs-Dev/LuminaryLabs` ledger/change-log state.

## Full Publish repo comparison

Current accessible `LuminaryLabs-Publish` repos observed:

```txt
AetherVale            tracked; root .agent state observed
HorrorCorridor        tracked; root .agent state observed
IntoTheMeadow         tracked; root .agent state observed
MyCozyIsland          tracked; root .agent state observed
PhantomCommand        tracked; root .agent state observed
PrehistoricRush       tracked; root .agent state observed
TheCavalryOfRome      excluded by standing rule
TheOpenAbove          tracked; root .agent state observed
TheUnmappedHouse      selected: remaining central status-summary rollup gap
ZombieOrchard         tracked; root .agent state observed
```

## Selection result

No currently observed non-excluded `LuminaryLabs-Publish` repo appears completely absent from central tracking.

`TheUnmappedHouse` was selected because it remains the least-normalized central documentation case: repo-local `.agent` state exists and the central repo-ledger file exists, but central reports still identify it as direct readback context rather than full `status-summary.json` publish-game rollup inclusion.

This is a documentation integrity pass, not a runtime implementation pass.

## Interaction loop

```txt
open index.html
  -> module-load ./src/game.js
  -> load saved localStorage state or create initial story state
  -> choose current scene from story-data descriptors
  -> load scene into StageKit
  -> render fixed-camera stage, story panel, hotspot list, notebook, hover label
  -> player clicks invisible StageKit hotspot or side-panel inspect button
  -> inspectHotspot marks hotspot inspected
  -> grant clue(s)
  -> write notebook log
  -> check requiresToComplete against clue ledger
  -> if complete, show interlude overlay
  -> Continue advances to next scene and updates route
  -> save state
  -> KeyR clears save and reloads
```

## Domains in use

```txt
unmapped-house
├─ static-shell
│  ├─ html-route
│  ├─ story-panel
│  ├─ hotspot-list
│  ├─ notebook-debug
│  ├─ hover-label
│  └─ interlude-overlay
├─ story-runtime
│  ├─ initial-state
│  ├─ save-load
│  ├─ clue-ledger
│  ├─ inspected-hotspot-map
│  ├─ scene-completion
│  ├─ route-state
│  ├─ scene-transition
│  └─ reset-state
├─ story-source
│  ├─ scene-descriptors
│  ├─ camera-descriptors
│  ├─ stage-layer-descriptors
│  ├─ stage-prop-descriptors
│  ├─ hotspot-descriptors
│  ├─ clue-grant-descriptors
│  ├─ completion-requirements
│  └─ interlude-copy
├─ stage-renderer
│  ├─ three-render-host
│  ├─ fixed-camera
│  ├─ parallax-camera-offset
│  ├─ lights-and-fog
│  ├─ anime-shader-material
│  ├─ stage-layer-rendering
│  ├─ prop-rendering
│  ├─ invisible-hotspot-volumes
│  ├─ raycast-picking
│  ├─ webgl-render-target
│  └─ post-process-pass
├─ deployment
│  └─ github-pages-static-deploy
└─ documentation-control
   ├─ repo-local-agent-state
   ├─ central-repo-ledger
   └─ central-status-rollup-gap
```

## Services that current kits offer

```txt
createInitialState()
loadState()
saveState()
hasClue(clue)
grantClues(clues)
writeLog(entry)
sceneComplete(scene)
inspectHotspot(hotspot)
showInterlude(scene)
nextScene()
renderUi()
KeyR reset handler
StageKit constructor
StageKit.animeMaterial(preset)
StageKit.loadScene(sceneData)
StageKit.createLayer(layer)
StageKit.createProp(prop)
StageKit.createHotspot(hotspot)
StageKit.handlePointer(event)
StageKit.pick()
StageKit.clickHotspot()
StageKit.resize()
StageKit.animate()
GitHub Pages static deploy workflow
```

## Kits identified

Implemented or implied:

```txt
unmapped-house-static-shell-kit
unmapped-house-story-panel-kit
unmapped-house-hotspot-list-kit
unmapped-house-notebook-debug-kit
unmapped-house-hover-label-kit
unmapped-house-interlude-overlay-kit
unmapped-house-story-data-kit
unmapped-house-story-runtime-kit
unmapped-house-story-state-save-kit
unmapped-house-localstorage-save-adapter-kit
unmapped-house-clue-ledger-kit
unmapped-house-scene-completion-kit
unmapped-house-route-state-kit
unmapped-house-stage-kit
unmapped-house-fixed-camera-diorama-kit
unmapped-house-fixed-camera-parallax-kit
unmapped-house-stage-layer-kit
unmapped-house-stage-prop-kit
unmapped-house-stage-hotspot-volume-kit
unmapped-house-hotspot-raycast-kit
unmapped-house-anime-material-shader-kit
unmapped-house-stage-postprocess-kit
unmapped-house-static-pages-deploy-kit
unmapped-house-agent-state-kit
unmapped-house-central-ledger-readback-kit
unmapped-house-status-summary-rollup-gap-kit
```

Needed next-cut kits:

```txt
unmapped-house-story-source-snapshot-kit
unmapped-house-story-state-snapshot-kit
unmapped-house-stage-scene-snapshot-kit
unmapped-house-story-command-envelope-kit
unmapped-house-command-validation-kit
unmapped-house-command-rejection-reason-kit
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-route-journal-kit
unmapped-house-command-journal-kit
unmapped-house-save-result-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-stage-descriptor-validation-kit
```

## Source-backed findings

```txt
README.md confirms the fixed-camera anime point-and-click horror prototype and Stage Kit scope.
index.html confirms a single static route that loads ./src/game.js.
src/game.js confirms browser-host ownership of state, localStorage, hotspot inspection, clue grants, completion, interlude, UI projection, and reset.
src/stage-kit.js confirms StageKit owns renderer setup, camera, raycaster, lights, render target, post-process, scene loading, pointer picking, resize, and animation.
src/story-data.js confirms three scene descriptors with camera, layers, props, hotspots, clue grants, completion requirements, and interludes.
.github/workflows/deploy.yml confirms GitHub Pages deploy on pushes to main and manual dispatch.
```

## Validation

Performed:

```txt
repo-list comparison: yes
root .agent readback checks: yes for checked non-excluded repos
README/source readback: yes
runtime files changed: no
branch created: no
pull request created: no
```

Not performed:

```txt
local static server: no
browser smoke: no
Playwright smoke: no
JavaScript syntax check: no
GitHub Actions run review: no
status-summary.json schema edit: no
```

## Next safe ledge

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

Do this before story expansion, renderer extraction, route graph expansion, save-slot work, or audio/controller additions.
