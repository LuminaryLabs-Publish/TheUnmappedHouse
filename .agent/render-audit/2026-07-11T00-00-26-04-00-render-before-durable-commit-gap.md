# Render audit: Projection before durable commit gap

Timestamp: `2026-07-11T00-00-26-04-00`

## Finding

The visual stage and DOM are updated before persistence confirms the story revision.

### Inspection path

```txt
mutate state
schedule interlude timer
renderUi()
saveState()
```

A write failure occurs after the player sees the new inspection state. The delayed interlude can still open even though the completed scene was never durably committed.

### Continue path

```txt
mutate currentScene and state.route
hide interlude
stage.loadScene(next)
renderUi()
saveState()
```

A write failure occurs after the next Three.js scene and story panel are visible. Reload then restores the previous durable scene, so the player observed a stage revision that had no committed save revision.

### Boot path

```txt
new StageKit()
  -> renderer
  -> render target
  -> listeners
  -> recursive RAF
stage.loadScene(currentScene)
renderUi()
saveState()
```

A denied write can throw after the render host is already live. There is no boot rollback that cancels RAF, removes listeners or disposes GPU resources.

## Required render contract

Every rendered story scene should expose:

```txt
storySaveRevision
storyStateFingerprint
storySceneId
stageCommitId
stageEpoch
projectionStatus
```

Allowed projection statuses:

```txt
committed
recovering
fatal
```

A normal playable frame must not present an uncommitted story snapshot as committed.

## Required StageKit companion behavior

```txt
prepareScene(sceneData, transitionId)
  -> detached build plan and resource ledger
commitPreparedScene(preparedId)
  -> typed StageCommitResult
discardPreparedScene(preparedId)
  -> disposal result
observeCommittedScene()
  -> JSON-safe sceneId, commitId and epoch
dispose()
  -> idempotent host teardown
```

## Failure projection rules

```txt
inspection save fails:
  keep previous committed story projection
  show bounded persistence failure status
  schedule no interlude

transition persistence prepare fails:
  keep previous stage and story projection

stage commit fails after pending save:
  retain recoverable pending transaction
  restore previous visible stage when possible
  resolve deterministically on reload

boot persistence fails:
  either run explicit ephemeral mode or enter fatal state
  never leave an unowned RAF/render host
```

## Validation rows

```txt
inspection-write-failure-does-not-open-interlude
inspection-write-failure-keeps-committed-ui
continue-write-failure-keeps-previous-stage
stage-commit-correlates-save-revision
boot-write-failure-disposes-render-host
render-observation-is-json-safe
no-frame-claims-uncommitted-story-revision
```

## Deferred

Shader design, camera retuning, new props and visual polish remain outside this gate.