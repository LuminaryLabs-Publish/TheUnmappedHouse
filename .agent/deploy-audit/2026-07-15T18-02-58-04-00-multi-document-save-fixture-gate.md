# Deploy audit: multi-document story save fixture gate

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Status:** `proof-gated`

## Summary

Syntax checks and static Pages delivery do not prove save ordering across tabs. Production readiness requires same-origin browser fixtures that run concurrent documents against source, built artifact and deployed Pages while comparing visible story state with the durable save head.

## Plan ledger

**Goal:** prove stale writers, reset resurrection and writer retirement are rejected consistently in every delivered surface.

- [x] Identify the missing concurrency proof matrix.
- [x] Define source, artifact and Pages gates.
- [x] Define required evidence and failure conditions.
- [ ] Implement the save authority.
- [ ] Execute and retain fixture artifacts.

## Required fixture matrix

| Fixture | Required result |
|---|---|
| Two tabs load the same head, A advances, B writes | B receives `StorySaveCommitRejectedStaleBase`; A's head remains durable. |
| Two tabs, A resets, B writes old progress | B receives `StorySaveCommitRejectedResetEpoch`; reset remains durable. |
| Two tabs request writer ownership | Exactly one active lease is accepted. |
| Active writer closes during pending work | Writer retires or lease expires; no late write commits. |
| Hidden tab resumes after external head advance | It reconciles before writing. |
| Storage event arrives during pending commit | Pending stale commit is cancelled or rejected. |
| BroadcastChannel unavailable | Fallback still rejects stale writes through durable revision checks. |
| `navigator.locks` unavailable | Lease fallback preserves ordering. |
| Newest envelope is corrupt | Verified predecessor recovery follows policy. |
| Save quota or storage failure | Gameplay remains visible and persistence failure is explicit. |
| Source, built artifact and Pages | All produce matching result statuses and durable fingerprints. |

## Browser evidence

Each run should capture:

```txt
origin and route
browser and version
document IDs
writer IDs and generations
lease IDs
initial durable revision and reset epoch
commands and candidate base revisions
accepted/rejected results
durable head after every step
visible story revision in every document
screenshots of conflict or read-only projection
storage and BroadcastChannel event transcript
final envelope fingerprint
```

## Required acknowledgements

```txt
FirstDurableStorySaveAck
FirstDurableStorySaveFrameAck
StorySaveConflictFrameAck
StorySaveResetFrameAck
StorySaveArtifactParityConfirmed
```

## Failure conditions

```txt
stale candidate becomes durable
reset epoch is overwritten by an older writer
more than one active lease is accepted
retired document commits later
visible UI claims durable success after rejection
source and Pages return different statuses
fixture captures no durable head fingerprint
```

## Current deployment evidence

```txt
package syntax script: declared
static Pages workflow: present
multi-document browser fixture: absent
writer lease fixture: absent
reset tombstone fixture: absent
conflict UI fixture: absent
artifact parity fixture: absent
Pages save concurrency smoke: absent
```

## Validation boundary

No workflow, build script, test harness, artifact or Pages deployment was changed or executed.