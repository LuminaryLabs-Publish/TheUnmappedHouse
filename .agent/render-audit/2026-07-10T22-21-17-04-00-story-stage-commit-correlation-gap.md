# Render audit: story-stage commit correlation gap

Timestamp: `2026-07-10T22-21-17-04-00`

## Current render path

```txt
Story runtime selects currentScene
  -> StageKit.loadScene(scene descriptor)
  -> live stage group is cleared
  -> background, fog, camera and post uniforms mutate
  -> layer, prop and hotspot resources are created
  -> recursive RAF renders to WebGLRenderTarget
  -> post pass renders to canvas
```

## Correlation gap

The visible stage has no immutable identity shared with story state.

Current evidence does not include:

```txt
story state revision
story state fingerprint
story phase
story transition id
requested scene id
committed stage scene id
stage commit id
stage epoch
source fingerprint
save revision
rendered frame id
```

`nextScene()` changes the story scene and route before `StageKit.loadScene()` succeeds. `StageKit.loadScene()` returns no result. A failure can therefore produce a story snapshot that names the next scene while the renderer is blank, partial or still showing an unrelated resource state.

## Required committed observation

```txt
StoryStageObservation
  transitionId
  sourceFingerprint
  storyStateRevision
  storyStateFingerprint
  storyPhase
  storySceneId
  stageCommitId
  stageEpoch
  stageSceneId
  resourceCounts
  saveRevision
  status
```

## Commit rule

A route transition should be staged in this order:

```txt
prepare next StorySnapshot
  -> request detached StageBuildPlan
  -> prepare replacement resources
  -> commit stage and obtain StageCommitResult
  -> commit StorySnapshot
  -> write save envelope
  -> publish one StoryStageObservation
```

If stage preparation or commit fails, the previous story snapshot, save and visible stage remain authoritative.

## Render-host companion requirements

- Keep the old stage visible while preparing the replacement.
- Return a typed stage result.
- Increment stage epoch only on successful commit.
- Dispose the prior scene only after the new stage commits.
- Attach canonical scene/hotspot/epoch refs to pickable meshes.
- Expose JSON-safe resource counts and stage identity.
- Provide idempotent RAF/listener/resource teardown.

## Required fixture rows

```txt
story-and-stage-scene-identities-match
story-transition-id-correlates-stage-commit-id
failed-stage-prepare-retains-old-visible-stage
failed-stage-prepare-retains-old-story-state
successful-stage-commit-precedes-save-write
stage-epoch-increments-once
render-observation-json-safe
```
