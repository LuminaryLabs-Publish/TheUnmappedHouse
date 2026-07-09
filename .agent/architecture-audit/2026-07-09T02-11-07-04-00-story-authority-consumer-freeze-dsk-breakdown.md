# Architecture Audit: Story Authority Consumer Freeze DSK Breakdown

**Timestamp:** `2026-07-09T02-11-07-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Architecture read

The current application is a compact static web app.

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
  -> src/aspect-frame.js
```

`src/game.js` owns story authority and browser adaptation together. It imports `StageKit` and `scenes`, captures DOM nodes at module scope, loads saved state, constructs `StageKit`, dispatches inspection/continue/reset events, mutates story state, triggers StageKit scene loads, writes localStorage, renders UI, schedules interludes, and emits debug JSON.

`src/stage-kit.js` owns the visual stage and should remain a consumer of stage descriptors. It is not the first extraction target.

## DSK/domain map

```txt
unmapped-house-app-domain
├─ source-domain
│  ├─ story-data-kit                       implemented in src/story-data.js
│  ├─ story-source-manifest-kit            missing next
│  ├─ story-source-snapshot-kit            missing next
│  └─ story-source-preflight-kit           missing next
├─ story-state-domain
│  ├─ initial-story-state-kit              inline in createInitialState
│  ├─ loaded-state-normalization-kit       missing next
│  ├─ clue-ledger-kit                      inline in hasClue/grantClues
│  ├─ scene-completion-kit                 inline in sceneComplete
│  └─ story-state-snapshot-kit             missing next
├─ command-domain
│  ├─ story-command-envelope-kit           missing next
│  ├─ story-command-validation-kit         missing next
│  ├─ story-command-reason-kit             missing next
│  ├─ story-command-result-kit             missing next
│  ├─ story-event-record-kit               missing next
│  └─ story-reducer-kit                    missing next
├─ browser-adapter-domain
│  ├─ story-ui-projection-kit              inline in renderUi
│  ├─ save-projection-kit                  missing next
│  ├─ interlude-projection-kit             missing next
│  ├─ stage-projection-kit                 missing next
│  ├─ browser-adapter-plan-kit             missing next
│  ├─ browser-adapter-readback-kit         missing next
│  └─ GameHost-story-diagnostics-kit       missing next
├─ render-domain
│  ├─ aspect-frame-kit                     implemented in src/aspect-frame.js
│  ├─ stage-render-host-kit                implemented in src/stage-kit.js
│  ├─ fixed-camera-diorama-kit             implemented via scene descriptors
│  ├─ stage-layer-kit                      implemented via scene.stage.layers
│  ├─ stage-prop-kit                       implemented via scene.stage.props
│  ├─ hotspot-volume-kit                   implemented via scene.hotspots and createHotspot
│  ├─ hotspot-raycast-kit                  implemented in StageKit pick/clickHotspot
│  ├─ anime-material-shader-kit            implemented in StageKit animeMaterial
│  ├─ stage-postprocess-kit                implemented in StageKit post pass
│  └─ stage-scene-snapshot-kit             missing next
├─ persistence-domain
│  ├─ localstorage-save-kit                inline in loadState/saveState
│  ├─ save-intent-kit                      missing next
│  └─ reset-save-result-kit                missing next
├─ fixture-domain
│  ├─ DOM-free-story-fixture-kit           missing next
│  ├─ stage-descriptor-validation-kit      missing next
│  ├─ hotspot-fixture-matrix-kit           missing next
│  ├─ save-load-fixture-kit                missing next
│  └─ fixture-summary-projection-kit       missing next
└─ central-tracking-domain
   ├─ agent-state-kit                      implemented in .agent docs
   └─ central-ledger-readback-kit          missing runtime fixture row
```

## Current service ownership

```txt
src/game.js:
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

src/stage-kit.js:
  StageKit constructor
  animeMaterial
  loadScene
  createLayer
  createProp
  createHotspot
  handlePointer
  pick
  clickHotspot
  resize
  animate

src/story-data.js:
  gameTitle
  scenes
  cameras
  stage layers
  props
  hotspots
  grants
  completion requirements
  interlude copy
```

## Required source modules next

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
src/story-authority/story-preflight.js
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
src/story-authority/save-projection.js
src/story-authority/interlude-projection.js
src/story-authority/stage-projection.js
src/story-authority/story-browser-adapter-plan.js
src/story-authority/browser-adapter-readback.js
src/story-authority/gamehost-story-diagnostics.js
src/story-authority/central-ledger-readback.js
src/story-authority/story-fixture-cases.js
scripts/validate-story-authority.mjs
```

## Architecture decision

Freeze StageKit behavior until story authority fixtures exist.

The correct next pass is additive and source-first: add pure modules, prove DOM-free result rows, then adapt `src/game.js` to consume projection/readback records without changing visible route behavior.
