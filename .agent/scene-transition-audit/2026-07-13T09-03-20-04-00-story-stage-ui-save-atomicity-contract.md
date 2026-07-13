# Scene-transition audit: story, stage, UI and save atomicity contract

**Timestamp:** `2026-07-13T09-03-20-04-00`

## Summary

This contract defines the product-level atomicity required when moving between authored scenes. It is intentionally narrower than a general distributed transaction and broader than any one participant kit.

## Plan ledger

**Goal:** specify participant preparation, adoption, rollback and proof precisely enough for deterministic implementation and fault injection.

- [x] Define participants and revisions.
- [x] Define preparation and commit invariants.
- [x] Define terminal results.
- [x] Define fault-injection matrix.
- [ ] Implement and validate.

## Participants

```txt
story participant
  currentScene, sceneId, route, log

stage participant
  sceneData, camera, fog, stageGroup, materials, hotspots, post values

interlude participant
  open/closed state, title, text, terminal state

UI participant
  scene title, story text, hotspot buttons, Notebook projection

save participant
  canonical serialized story snapshot
```

## Prepare phase

Each participant receives the same command and expected predecessor revisions. Preparation may allocate detached resources or bytes but may not publish or replace live state.

## Adoption phase

Adoption occurs only when every receipt is `Prepared`. The aggregate authority assigns one accepted revision set and publishes one result. If adoption cannot complete, rollback restores every predecessor revision and emits evidence.

## Resource rule

Successor stage resources are candidate-owned until adoption. Predecessor stage resources remain live until the successor is accepted. Candidate resources are disposed on rejection; predecessor resources are disposed after accepted replacement.

## Persistence rule

The save candidate must be canonical and serializable during preparation. Durable promotion must either succeed before visible adoption or be explicitly governed by a recoverable commit protocol. Silent durable divergence is prohibited.

## Result statuses

```txt
Accepted
TerminalAccepted
InvalidRoute
CompletionRequired
DescriptorRejected
StagePreparationFailed
UiPreparationFailed
PersistenceRejected
CommitFailedRolledBack
Duplicate
Stale
Cancelled
```

## Required invariants

```txt
one command has one terminal result
one predecessor revision has at most one accepted successor
rejected work produces zero live mutation
accepted work publishes one coherent participant set
rollback restores the complete predecessor set
no predecessor resource retires before successor adoption
visible frame cites an accepted transition
reload resolves the same accepted story revision
```

## Fault matrix

```txt
throw during camera candidate construction
throw during geometry candidate construction
throw during shader candidate construction
malformed hotspot descriptor
DOM node unavailable
button construction failure
JSON serialization failure
localStorage quota rejection
late predecessor command
duplicate command
exception during aggregate adoption
renderer failure before first successor frame
```

## Completion gate

The authority is complete only when every fault produces a typed result, preserves or restores the expected participant set and passes visible and reload parity checks.