# Architecture audit: story-stage transition DSK map

Timestamp: `2026-07-11T04-00-07-04-00`

## Current authority split

| Source | Current authority |
|---|---|
| `src/story-data.js` | Story and visual descriptors. |
| `src/game.js` | Mutable story identity, route, interlude, Continue, DOM projection and save effects. |
| `src/stage-kit.js` | Live Three.js resources, picking, scene replacement and frame rendering. |

No single transaction owns the transition across those surfaces.

## Current transition

```txt
Continue click
  -> find next descriptor
  -> mutate currentScene
  -> mutate state.sceneId, route and log
  -> hide interlude
  -> clear committed StageKit group
  -> allocate replacement resources directly into live stage
  -> project DOM
  -> write localStorage
  -> eventually render a frame
```

## Required domain

```txt
story-stage-transition-authority-domain
  -> transition-command-kit
  -> transition-admission-kit
  -> transition-plan-kit
  -> story-candidate-snapshot-kit
  -> stage-build-plan-kit
  -> stage-preparation-kit
  -> durable-story-commit-kit
  -> atomic-stage-commit-kit
  -> transition-rollback-kit
  -> retired-resource-ledger-kit
  -> stage-epoch-kit
  -> first-frame-acknowledgement-kit
  -> transition-result-kit
  -> transition-journal-kit
  -> transition-fixture-kit
```

## Required command

```txt
ContinueStory {
  requestId,
  origin,
  expectedSceneId,
  expectedPhase,
  expectedSaveRevision,
  expectedStageEpoch
}
```

## Required result

```txt
StoryStageTransitionResult {
  transitionId,
  status: accepted | rejected | duplicate | failed | rolled_back,
  fromSceneId,
  toSceneId,
  storyRevision,
  stageEpoch,
  stageCommitId,
  firstFrameId,
  failurePhase,
  reason
}
```

## Commit rule

The prior committed story and stage remain visible until all prerequisites succeed:

```txt
admission
  -> candidate story snapshot
  -> descriptor validation
  -> detached stage preparation
  -> durable story write
  -> atomic stage swap
  -> DOM projection from committed snapshot
  -> first-frame acknowledgement
  -> retire and dispose prior resources
```

If preparation or persistence fails, discard the candidate and keep the prior committed story, interlude and stage unchanged.

## Ordering dependency

This domain requires the already-planned versioned save envelope, explicit story phase and typed persistence results. It should not be implemented as another direct wrapper around `nextScene()` or `StageKit.loadScene()`.