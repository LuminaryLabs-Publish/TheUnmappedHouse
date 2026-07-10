# Gameplay audit: story scene to StageKit commit loop

Timestamp: `2026-07-10T17-29-23-04-00`

## Current route transaction

```txt
continue click
  -> locate next scene
  -> mutate currentScene
  -> mutate state.sceneId
  -> append state.route
  -> write notebook log
  -> close interlude DOM
  -> StageKit.loadScene(next)
  -> renderUi()
  -> saveState()
```

## Authority problem

The story transition begins before the render transition is proven. `StageKit.loadScene()` has no result, so gameplay cannot distinguish:

```txt
scene accepted and fully committed
scene rejected before mutation
scene failed during provisional construction
scene partially installed
scene committed but not yet presented
```

A thrown load can leave story memory advanced while the stage is partial and persistence incomplete. A future asynchronous resource path would widen this gap.

## Required gameplay contract

```txt
ContinueCommand
  -> story preflight
  -> StoryTransitionIntent
  -> StageLoadRequest
  -> StageLoadResult
       accepted + committed epoch
       rejected + prior scene retained
       failed + rollback complete
  -> StoryTransitionCommit
  -> projection/save effects
  -> StageFrameAcknowledgement
  -> presented transition record
```

## Gameplay invariants

- A scene route entry is committed once.
- Story scene id and StageKit scene id agree after every successful transition.
- A failed/rejected StageKit load does not advance or save the story route.
- The interlude remains recoverable until stage commit succeeds.
- The first frame for a new epoch is correlated to the transition.
- Terminal completion remains a story state, not only direct DOM copy.
- Current route order, clue requirements, copy, and 450 ms pacing remain unchanged.
