# Story Browser Adapter Readback DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T23-19-33-04-00`

## Selection

`TheUnmappedHouse` was selected after comparing the accessible `LuminaryLabs-Publish` repo list against central ledger state and sampled root `.agent` state. No non-Cavalry repo was new, undocumented, ledger-absent, or missing root `.agent` state.

The selected repo had a repo-local `.agent` readback newer than central ledger state, so this pass records a central catch-up and sharpens the next source implementation.

## Interaction loop

```txt
current:
  index.html
    -> src/game.js
    -> loadState()
    -> StageKit.loadScene(currentScene)
    -> inspectHotspot(hotspot)
    -> direct state/log/clue/text/completion/interlude/save mutation
    -> nextScene()
    -> direct route/interlude/stage/UI/save mutation
    -> debug JSON projection

target:
  UI event or StageKit callback
    -> StoryCommandEnvelope
    -> StoryPreflight
    -> StoryCommandResult
    -> StoryEventRecord[]
    -> StoryProjection
    -> SaveProjection
    -> InterludeProjection
    -> StageProjection
    -> StoryBrowserAdapterPlan
    -> BrowserAdapterReadback
    -> GameHostStoryDiagnostics
```

## Domains in use

```txt
static-page-shell
browser-app-runtime
story-source
story-state
localstorage-save
notebook-log
route-state
interlude-overlay
stage-render-host
fixed-aspect-frame
fixed-camera-composition
scene-descriptor
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hotspot-raycast-picking
hover-label-projection
anime-material-shader
webgl-post-process
debug-json-projection
```

## Missing domains

```txt
story-source-manifest
story-source-snapshot
story-source-preflight
story-state-snapshot
stage-scene-snapshot
story-command-envelope
story-command-validation
story-command-reason-authority
story-command-result-authority
story-event-record
story-result-reducer
story-projection
save-projection
interlude-projection
stage-projection
story-browser-adapter-plan
browser-adapter-readback
story-host-adapter
GameHost-story-diagnostics
fixture-replay
central-ledger-snapshot
```

## Services the kits offer now

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
computeAspectFrame
applyAspectFrame
StageKit renderer/camera/raycaster/lights/render-target setup
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
story scene descriptors
package syntax check
```

## Kits identified

```txt
implemented or implied:
  unmapped-house-static-shell-kit
  unmapped-house-static-pages-deploy-kit
  unmapped-house-browser-runtime-kit
  unmapped-house-story-data-kit
  unmapped-house-story-runtime-kit
  unmapped-house-story-state-save-kit
  unmapped-house-localstorage-save-kit
  unmapped-house-clue-ledger-kit
  unmapped-house-scene-completion-kit
  unmapped-house-interlude-overlay-kit
  unmapped-house-route-state-kit
  unmapped-house-notebook-debug-kit
  unmapped-house-aspect-frame-kit
  unmapped-house-stage-kit
  unmapped-house-fixed-camera-diorama-kit
  unmapped-house-stage-layer-kit
  unmapped-house-stage-prop-kit
  unmapped-house-stage-hotspot-volume-kit
  unmapped-house-hotspot-raycast-kit
  unmapped-house-hover-label-kit
  unmapped-house-anime-material-shader-kit
  unmapped-house-stage-postprocess-kit
  unmapped-house-static-validation-kit
  unmapped-house-agent-state-kit
  unmapped-house-central-ledger-readback-kit

next-cut:
  unmapped-house-story-source-manifest-kit
  unmapped-house-story-source-snapshot-kit
  unmapped-house-story-source-preflight-kit
  unmapped-house-story-state-snapshot-kit
  unmapped-house-stage-scene-snapshot-kit
  unmapped-house-story-command-envelope-kit
  unmapped-house-command-validation-kit
  unmapped-house-story-command-result-kit
  unmapped-house-story-command-reason-kit
  unmapped-house-story-reducer-kit
  unmapped-house-story-event-record-kit
  unmapped-house-inspection-action-kit
  unmapped-house-inspection-result-contract-kit
  unmapped-house-clue-ledger-reducer-kit
  unmapped-house-scene-completion-result-kit
  unmapped-house-scene-transition-result-kit
  unmapped-house-prototype-complete-result-kit
  unmapped-house-save-result-kit
  unmapped-house-save-projection-kit
  unmapped-house-interlude-projection-kit
  unmapped-house-stage-projection-kit
  unmapped-house-browser-adapter-plan-kit
  unmapped-house-browser-adapter-readback-kit
  unmapped-house-route-state-journal-kit
  unmapped-house-command-journal-kit
  unmapped-house-story-ui-projection-kit
  unmapped-house-gamehost-diagnostics-kit
  unmapped-house-dom-free-fixture-kit
  unmapped-house-hotspot-fixture-matrix-kit
  unmapped-house-scene-completion-fixture-kit
  unmapped-house-save-load-fixture-kit
  unmapped-house-stage-descriptor-validation-kit
  unmapped-house-fixture-summary-projection-kit
```

## Architecture decision

Keep `StageKit` and the current three-scene content stable. Cut authority out of `src/game.js` by adding pure story-source, result, projection, adapter, readback, and fixture modules first.
