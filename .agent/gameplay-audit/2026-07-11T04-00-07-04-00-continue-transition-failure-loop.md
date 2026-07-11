# Gameplay audit: Continue transition failure loop

Timestamp: `2026-07-11T04-00-07-04-00`

## Current loop

```txt
scene complete
  -> delayed interlude opens
  -> player presses Continue
  -> currentScene advances immediately
  -> state.sceneId, route and log mutate
  -> interlude closes
  -> stage replacement begins
  -> UI projects
  -> save writes
```

## Deterministic failure windows

### Stage construction failure

```txt
story memory = next scene
route/log     = next scene
interlude     = hidden
stage         = blank or partial
DOM copy      = prior scene until renderUi
save          = prior scene
```

### Persistence failure after stage success

```txt
story memory = next scene
stage         = next scene
DOM copy      = next scene
save          = prior scene
reload        = prior scene
```

### Repeated Continue

The handler has no phase, scene, revision or stage-epoch guard. A repeated activation can evaluate against already-mutated `currentScene` and attempt another advance.

### Final Continue

The final path changes interlude copy only. It does not commit terminal story state, stage identity or a durable result.

## Required gameplay transaction

```txt
ContinueStory command
  -> admission against committed phase and revision
  -> transition candidate
  -> detached stage preparation
  -> durable story commit
  -> stage commit
  -> projection commit
  -> first-frame acknowledgement
  -> accepted result
```

Failure must produce a typed result and preserve the previous playable scene.

## Required fixture rows

```txt
stage-prepare-failure-keeps-prior-story-and-stage
save-failure-discards-prepared-stage
stage-commit-failure-restores-prior-stage
projection-failure-remains-recoverable
first-frame-timeout-reports-pending-or-failed
repeated-continue-does-not-skip-a-scene
final-continue-commits-terminal-once
reload-after-accepted-transition-restores-new-scene
reload-after-failed-transition-restores-prior-scene
```