# Gameplay audit: Continue Scene Replacement Loop

**Timestamp:** `2026-07-12T19-11-01-04-00`

## Summary

The player-facing Continue action commits story routing before StageKit can report whether successor resources were fully prepared or visibly rendered.

## Plan ledger

**Goal:** couple story transition success to a typed stage-resource result without moving renderer ownership into gameplay.

- [x] Trace completion, interlude, Continue and scene load.
- [x] Identify partial-transition and terminal-lifetime gaps.
- [ ] Implement a two-part story/stage commit fixture.

## Current loop

```txt
Continue click
  -> currentScene = next
  -> state.sceneId = next.id
  -> route/log mutate
  -> interlude closes
  -> stage.loadScene(next)
  -> UI renders and state saves
```

`loadScene()` returns no result. Candidate allocation occurs directly in the live stage group. If construction throws after story mutation, no rollback restores the previous scene, UI or resource set.

At the final scene, Continue writes terminal copy but leaves the stage RAF and callbacks running indefinitely.

## Required result

```txt
SceneTransitionResult
  transitionId
  previousSceneId
  nextSceneId
  previousResourceRevision
  committedResourceRevision
  storyCommitStatus
  stageCommitStatus
  rollbackStatus
  firstVisibleFrameId
```
