# Story authority audit: story phase transition transaction

Timestamp: `2026-07-10T22-21-17-04-00`

## Authority objective

Make the narrative state machine independent from DOM timing and Three.js mutation. Every input should produce one typed result, every committed state should be resumable, and every scene transition should correlate with a successful stage commit.

## Proposed phases

```txt
exploring
interlude_pending
interlude_open
transitioning
terminal
```

## Phase transitions

```txt
exploring
  + final required InspectHotspot accepted
  -> interlude_pending

interlude_pending
  + readiness condition reached or restored on load
  -> interlude_open

interlude_open
  + ContinueStory accepted
  -> transitioning

transitioning
  + StageCommitResult committed
  -> exploring(next scene)

transitioning
  + StageCommitResult failed/rejected
  -> interlude_open(previous scene)

final interlude_open
  + ContinueStory accepted
  -> terminal
```

## Persisted pending interlude

```txt
sceneId
completionProofFingerprint
readyAt
copyId
stateRevisionCreated
```

The 450 ms pacing can remain, but readiness must be derived from persisted data. On load, `readyAt <= now` projects `interlude_open`; otherwise the runtime schedules the remaining duration with a retained timer associated with the state revision.

## Transition transaction

```txt
ContinueStory command
  -> validate current phase and expected revision
  -> prepare next StorySnapshot
  -> set transition request identity
  -> call story-stage adapter
  -> receive typed StageCommitResult
  -> commit or reject as one story result
  -> write save envelope after commit
  -> publish journal and projection
```

## Failure semantics

- Wrong phase rejects without mutation.
- Duplicate request id returns the prior result or a no-op.
- Stage rejection restores `interlude_open` for the previous scene.
- Stage failure does not advance the route or write the prepared snapshot.
- Storage failure is represented separately from stage success and must not be silently ignored.
- Terminal Continue commits a terminal result without requesting another stage.

## Observation row

```txt
storyTransitionId
commandRequestId
sourceFingerprint
stateRevisionBefore
stateRevisionAfter
phaseBefore
phaseAfter
sceneIdBefore
sceneIdAfter
stageCommitId?
stageEpoch?
saveRevision?
status
reason
```

## Required invariants

```txt
one active story phase
one committed scene identity
completion proof belongs to current source and scene
interlude projection derives from phase
route advances at most once per accepted command
story scene and stage scene agree after transition
terminal state survives reload
all results are JSON-safe
```
