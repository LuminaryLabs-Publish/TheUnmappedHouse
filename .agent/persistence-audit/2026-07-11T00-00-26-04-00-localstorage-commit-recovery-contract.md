# Persistence audit: localStorage commit and recovery contract

Timestamp: `2026-07-11T00-00-26-04-00`

## Current behavior

```txt
load:
  JSON.parse(localStorage.getItem(key) || "{}")
  shallow-merge over initial state
  catch every error and silently reset

write:
  localStorage.setItem(key, JSON.stringify(state))
  no catch
  no result

clear:
  localStorage.removeItem(key)
  no catch
  no result
```

## Failure classes currently collapsed or unhandled

```txt
storage unavailable
SecurityError / access denied
invalid JSON
invalid save shape
serialization failure
quota exceeded
write failure
clear failure
source mismatch
stale save revision
interrupted transition
```

Load catches access and parse errors but does not report which occurred. Write and clear errors propagate after state, DOM, timers or StageKit may already have changed.

## Versioned envelope

```js
{
  schemaVersion,
  storyManifestId,
  storySourceFingerprint,
  saveRevision,
  stateFingerprint,
  committedAt,
  phase,
  storySnapshot,
  pendingTransaction: null | {
    transactionId,
    commandId,
    previousRevision,
    targetRevision,
    targetSceneId,
    stageCommitId,
    status
  }
}
```

## Storage adapter contract

```txt
read(key) -> PersistenceLoadResult
write(key, expectedRevision, envelope) -> PersistenceWriteResult
clear(key, expectedRevision) -> PersistenceClearResult
```

Results must be JSON-safe and include:

```txt
attemptId
status
reason
expectedRevision
observedRevision
writtenRevision
recoverable
```

## Write policy

- Serialize a detached immutable envelope before any live mutation.
- Reject stale expected revisions.
- Record a pending transition before a scene-changing visual commit.
- Finalize the envelope after the stage commit result is known.
- Schedule interlude readiness only from a committed envelope.
- Project ordinary UI only from the committed snapshot.
- Preserve the previous envelope on rejected or failed writes.
- Never silently convert storage denial into a successful fresh save.

## Recovery policy

On load:

```txt
no envelope
  -> fresh committed revision

valid finalized envelope
  -> restore committed snapshot

valid pending transition
  -> validate source and target
  -> deterministically finish or roll back
  -> emit recovery result

invalid/corrupt envelope
  -> reconcile or reset through typed result

storage unavailable
  -> enter explicit ephemeral or fatal mode
  -> never claim persistence succeeded
```

## Required fixtures

Use an injected adapter that can deterministically:

```txt
return no value
throw on read
return invalid JSON
return stale revision
throw serialization error
throw SecurityError on write
throw quota error on write
fail pending write
succeed pending and fail final write
throw on clear
```

Required rows:

```txt
fresh-envelope-commits-revision-one
successful-write-increments-revision
stale-write-rejected
write-failure-preserves-previous-envelope
pending-transition-recovers-once
finalize-failure-remains-recoverable
storage-denial-enters-explicit-mode
clear-failure-returns-result
journal-redacts-no-raw-dom-or-three-objects
```

## Relationship to phase authority

The phase state machine remains the source of story meaning. Persistence authority makes that phase durable and recoverable. It must not infer completion from DOM visibility or StageKit objects.