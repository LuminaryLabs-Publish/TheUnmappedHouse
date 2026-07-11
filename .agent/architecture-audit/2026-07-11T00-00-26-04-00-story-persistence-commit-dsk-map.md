# Architecture audit: Story persistence commit DSK map

Timestamp: `2026-07-11T00-00-26-04-00`

## Current ownership problem

`src/game.js` combines pure story decisions with browser effects:

```txt
story mutation
DOM projection
interlude timer scheduling
StageKit scene replacement
localStorage serialization/write/clear
page reload
```

The code has no result boundary between these operations. `saveState()` is a side-effecting void function, so callers cannot distinguish committed, denied, quota-exceeded, serialization-failed or unavailable persistence.

## Current command/effect order

```txt
InspectHotspot
  -> mutate inspected/clues/log
  -> schedule timer when complete
  -> render UI
  -> write save

ContinueStory
  -> mutate scene/route
  -> hide interlude
  -> load StageKit scene
  -> render UI
  -> write save

Boot
  -> construct StageKit resources/listeners/RAF
  -> load scene
  -> render UI
  -> write save
```

This order makes durable storage the final unobserved effect rather than the authority for which story revision is committed.

## Proposed parent domain

```txt
story-persistence-authority-domain
```

Owns:

```txt
persistence capability status
save schema and source identity
load result
current committed save revision
pending transaction identity
write/clear result
recovery decision
bounded persistence journal
```

Does not own:

```txt
story rule evaluation
Three.js resource construction
DOM implementation details
shader or camera behavior
```

## Proposed kits

| Kit | Responsibility |
|---|---|
| `persistence-capability-admission-kit` | Detect storage availability without mutating story authority. |
| `versioned-save-envelope-kit` | Carry schema, source fingerprint, save revision, story phase and state fingerprint. |
| `persistence-load-result-kit` | Return accepted, migrated, repaired, reset, unavailable or failed. |
| `persistence-write-result-kit` | Return committed, rejected or failed with revision and reason. |
| `persistence-clear-result-kit` | Return cleared, already-empty, unavailable or failed. |
| `save-revision-kit` | Generate monotonic revision identity within one source manifest. |
| `committed-story-snapshot-kit` | Hold the only snapshot eligible for UI and stage projection. |
| `pending-story-transaction-kit` | Describe command, before/after snapshots and required effects. |
| `story-persistence-commit-protocol-kit` | Order prepare, durable write, stage transition and finalization with recovery state. |
| `projection-from-commit-kit` | Project DOM and StageKit only from a named committed or recoverable revision. |
| `startup-cleanup-stack-kit` | Release acquired listeners, RAF and GPU resources when boot fails after acquisition. |
| `persistence-recovery-kit` | Resolve interrupted or pending transitions on reload. |
| `persistence-journal-kit` | Retain bounded JSON-safe load/write/clear/recovery rows. |
| `injected-storage-fixture-kit` | Supply deterministic success, denial, quota and partial-failure storage adapters. |
| `browser-storage-failure-smoke-kit` | Prove behavior in a real browser with storage denied or throwing. |

## Commit protocol

Because localStorage and WebGL cannot participate in one native transaction, use an explicit recoverable protocol:

```txt
1. admit command against committed StorySnapshot
2. produce pure next snapshot and effect plan
3. prepare stage resources without replacing committed stage
4. write a pending save envelope with transaction id and next snapshot
5. commit prepared stage
6. write finalized save envelope and clear pending state
7. project UI from finalized committed revision
8. on failure, return typed result and preserve or recover from the durable pending row
```

For inspection without stage replacement:

```txt
1. admit and reduce command
2. write next snapshot
3. project UI
4. schedule interlude readiness from committed phase/deadline
```

No timer should be scheduled from an uncommitted snapshot.

## Required identities

```txt
storyManifestId
storySourceFingerprint
commandId
transactionId
beforeSaveRevision
afterSaveRevision
beforeStateFingerprint
afterStateFingerprint
stageCommitId
stageEpoch
persistenceAttemptId
```

## Required result reasons

```txt
storage-unavailable
storage-access-denied
serialization-failed
quota-exceeded
write-failed
clear-failed
stale-revision
source-mismatch
stage-prepare-failed
stage-commit-failed
finalize-write-failed
recovered-pending-transition
rolled-back-to-committed
```

## Relationship to existing planned work

The resume-safe story phase authority remains P0. This audit adds the missing durable effect boundary beneath it. The atomic StageKit commit remains a companion domain. Story rules decide the next snapshot; persistence authority decides what is durable; StageKit decides whether a prepared visual scene can commit.

## Next safe ledge

```txt
TheUnmappedHouse Durable Story Commit Authority
+ Persistence Failure and Recovery Fixture Gate
```