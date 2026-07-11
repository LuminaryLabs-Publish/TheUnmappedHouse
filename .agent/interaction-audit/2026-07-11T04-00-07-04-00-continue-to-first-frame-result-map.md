# Interaction audit: Continue to first-frame result map

Timestamp: `2026-07-11T04-00-07-04-00`

## Current input path

```txt
continue button click
  -> nextScene()
  -> direct mutation
  -> direct stage call
  -> direct DOM projection
  -> direct save effect
```

The click carries no identity or expected state.

## Required command envelope

```txt
ContinueStory {
  requestId,
  origin: "interlude-button",
  expectedSceneId,
  expectedPhase,
  expectedStoryRevision,
  expectedStageEpoch,
  issuedAt
}
```

## Admission reasons

```txt
accepted
wrong-phase
scene-incomplete
scene-mismatch
story-revision-mismatch
stage-epoch-mismatch
duplicate-request
terminal-already-committed
transition-already-pending
```

## Result progression

```txt
command accepted
  -> transition planned
  -> stage prepared
  -> story persisted
  -> stage committed
  -> projection committed
  -> first frame observed
  -> resources retired
  -> final result published
```

## Readback rows

```txt
request row
admission row
preparation row
persistence row
stage commit row
projection row
first-frame row
retirement row
final result row
```

Each row must carry `requestId`, `transitionId`, `sceneId`, `storyRevision` and `stageEpoch` where applicable.

## Interaction invariant

The Continue button is enabled only from committed `interlude_open` state. UI visibility is projection, not authority. Programmatic or duplicated clicks must pass the same admission path and return deterministic results.