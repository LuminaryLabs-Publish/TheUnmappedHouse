# Gameplay audit: Scene transition and render commit loop

Timestamp: `2026-07-10T20-38-24-04-00`

## Player-facing loop

```txt
inspect three scene hotspots
  -> collect required clues
  -> completion opens an interlude after 450 ms
  -> continue advances to the next authored scene
  -> StageKit replaces the visible stage
  -> repeat through three scenes
  -> final continue projects prototype-complete copy
```

## Current transition authority

`src/game.js` changes `currentScene` and persisted route state before calling `stage.loadScene(currentScene)`. `loadScene()` returns no result, so gameplay assumes the replacement rendered successfully.

```txt
state transition accepted
  -> currentScene updated
  -> route updated
  -> interlude hidden
  -> StageKit load attempted
  -> UI rendered
  -> save written
```

If StageKit preparation fails, gameplay state can point at the new scene while the visual stage is empty or partial. There is no commit acknowledgement to coordinate save, UI, interaction admission and rendered scene identity.

## Required transition contract

```txt
request next scene
  -> prepare gameplay transition candidate
  -> request StageBuildPlan
  -> prepare detached render candidate
  -> commit render candidate
  -> receive StageCommitResult
  -> only then finalize visible scene/UI/save identity
```

Compatibility option:

```txt
gameplay state may advance first
  -> but must retain rollback snapshot
  -> reject or repair if StageCommitResult is not committed
```

The preferred model is a composed transaction that keeps story state and rendered stage identity aligned.

## Required result fields

```txt
transitionId
requestedSceneId
previousSceneId
stageEpochBefore
stageEpochAfter
renderStatus
resourceCounts
retiredResourceCounts
storyStateCommitted
saveWritten
failureReason
```

## Gameplay invariants

- One accepted continue produces at most one stage commit.
- A failed render preparation does not silently finalize a new visible scene.
- Repeated continue input cannot create duplicate stage groups or duplicate disposal.
- The final terminal projection does not attempt a nonexistent stage load.
- Reset/reload does not leave the old host loop active.
- Story pacing, clue requirements, interlude copy and route order remain unchanged.

## Deferred gameplay work

```txt
new rooms
branching route
inventory
audio
new endings
content expansion
```
