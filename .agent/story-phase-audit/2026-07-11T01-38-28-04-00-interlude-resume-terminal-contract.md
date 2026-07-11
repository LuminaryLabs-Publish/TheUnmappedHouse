# Story phase audit: interlude resume and terminal contract

Timestamp: `2026-07-11T01-38-28-04-00`

## Required persisted phase model

```txt
exploring
interlude_pending
interlude_open
transitioning
recovering
terminal
```

## Canonical phase fields

```txt
storyPhase
sceneId
completionProof
interludeTargetSceneId
interludeReadyAt
pendingTransition
terminalState
saveRevision
stateFingerprint
lastCommandId
```

## Completion proof

```txt
{
  sceneId,
  requiredClueIds[],
  satisfiedClueIds[],
  storySourceFingerprint,
  producedByCommandId,
  saveRevision
}
```

The proof is valid only when the required and satisfied sets match canonical story source data for the same scene and source fingerprint.

## Interlude contract

### Enter pending

After the final accepted inspection is durably committed:

```txt
storyPhase = interlude_pending
interludeTargetSceneId = current scene
interludeReadyAt = committedNow + 450 ms
```

### Boot reconciliation

```txt
pending and now < readyAt
  -> schedule remaining delay

pending and now >= readyAt
  -> reduce deadline command immediately

open
  -> project interlude open without scheduling

transitioning/recovering
  -> execute deterministic recovery

terminal
  -> project terminal state
```

### Deadline command

The timer adapter dispatches `InterludeDeadlineReached`; it does not directly call DOM projection. The reducer validates scene, phase, revision and runtime epoch before moving to `interlude_open`.

## Continue contract

```txt
precondition:
  storyPhase == interlude_open
  completionProof valid for sceneId
  expectedSceneId matches
  expectedSaveRevision matches

result:
  next scene exists -> transitioning
  no next scene     -> terminal
```

A repeated command id returns the original result. A second distinct Continue after transition begins returns a typed wrong-phase or in-flight result.

## Terminal contract

```txt
terminalState {
  completed: true,
  finalSceneId,
  route[],
  completedAt,
  commandId,
  saveRevision,
  stateFingerprint
}
```

Terminal projection must survive reload and must not rely only on changing interlude title/text nodes.

## Recovery invariants

- A completed scene never reloads into hidden, non-progressable UI.
- One completion proof creates at most one pending deadline.
- One accepted deadline creates at most one open interlude.
- One accepted Continue creates at most one route transition.
- A stale timer or Continue never mutates state or DOM.
- Terminal progress is durable and reload-safe.
- Projection occurs only from a committed snapshot.

## Required journals

```txt
phase-transition rows
timer schedule/cancel/fire rows
command admission/result rows
persistence attempt/result rows
stage prepare/commit/discard rows
recovery rows
terminal projection rows
```

All rows must be bounded, immutable, detached and JSON-safe.
