# WebGL Context Audit: Loss, Restore, and Resource Generation Contract

**Timestamp:** `2026-07-11T18-38-45-04-00`

## Summary

The application requires a context-generation contract that treats the WebGL renderer graph as a recoverable resource set rather than a permanently valid singleton.

## Plan ledger

**Goal:** specify context states, identities, resource inventory, recovery ordering, rollback, observation, and disposal behavior precisely enough for implementation and fixtures.

- [x] Define lifecycle states.
- [x] Define generation identities.
- [x] Define resource categories and rebuild ordering.
- [x] Define loss, restore, failure, retry, and disposal results.
- [x] Define invariants and fixture requirements.
- [ ] Implement the contract.

## Context state machine

```txt
UNINITIALIZED
  -> INITIALIZING
  -> READY

READY
  -> LOST

LOST
  -> RESTORING
  -> FAILED
  -> DISPOSED

RESTORING
  -> READY only after first recovered frame acknowledgement
  -> LOST if a newer loss supersedes the candidate
  -> FAILED after exhausted recovery policy
  -> DISPOSED

FAILED
  -> RESTORING through explicit retry
  -> DISPOSED
```

## Identity model

```txt
sessionId
sessionGeneration
storyRevision
stageEpoch
surfaceRevision
resizeGeneration
contextGeneration
resourceGeneration
frameId
```

`contextGeneration` advances only when a new usable WebGL context is admitted. `resourceGeneration` identifies the complete renderer/target/material/geometry registry prepared for that context. A resource generation cannot be shared across different context generations.

## Resource registry

```txt
renderer and canvas binding
renderer state policy
shadow state
render target and depth/multisample storage
post target texture binding
post scene geometry and material
stage scene, camera and lights
stage plane/box/cylinder geometries
stage shader materials and uniforms
hotspot geometries and materials
picking set revision
surface dimensions and pixel ratio
```

## Loss transaction

```txt
receive context-loss event
  -> validate active session and current generation
  -> deduplicate repeated loss
  -> stop ready-frame admission
  -> fence render-dependent input
  -> retain canonical story/stage/surface descriptors
  -> mark current resource generation unavailable
  -> publish ContextLostResult
  -> keep retry/reset/dispose capabilities explicit
```

## Restore transaction

```txt
receive restore event or explicit retry
  -> allocate candidate contextGeneration
  -> derive rebuild plan from canonical descriptors
  -> prepare renderer state
  -> prepare target storage and post binding
  -> prepare stage and hotspot resources
  -> validate complete registry
  -> reject stale session/stage/surface/context candidates
  -> atomically install candidate resourceGeneration
  -> submit one recovery frame
  -> read back committed dimensions and active bindings
  -> publish RecoveredFrameAck
  -> transition context state to READY
```

## Rollback and failure

```txt
any required preparation failure
  -> dispose all partial candidate resources
  -> publish per-resource failure rows
  -> keep predecessor generation unavailable
  -> retain canonical story/stage/surface descriptors
  -> classify retryable or terminal failure
  -> remain RESTORING or enter FAILED
```

## Result schema

```txt
ContextRecoveryResult
  resultId
  commandId
  status
  sessionId
  sessionGeneration
  predecessorContextGeneration
  candidateContextGeneration?
  committedContextGeneration?
  candidateResourceGeneration?
  committedResourceGeneration?
  storyRevision
  stageEpoch
  surfaceRevision
  rebuildRows[]
  failureClassification?
  rollbackRows[]
  firstRecoveredFrameId?
  createdAt
```

## Observation schema

```txt
ContextObservation
  state
  contextGeneration
  resourceGeneration
  storyRevision
  stageEpoch
  surfaceRevision
  lastReadyFrameId
  lastRecoveredFrameId
  suspendedCapabilities[]
  liveResourceCounts
  lastResult
```

All observations must be detached, clone-safe, JSON-safe, and bounded.

## Required invariants

```txt
READY implies a complete committed resource registry
READY implies one acknowledged frame for the active context generation
LOST/RESTORING/FAILED imply no ready-frame commits
render-dependent input requires active contextGeneration + frameId
partial candidates are never visible
stale generation results never commit
story state is preserved across recovery
repeated recovery does not accumulate live resources or listeners
disposal is idempotent and rejects later events
```

## Integration requirements

```txt
Runtime lifecycle owns listener registration/removal and final disposal.
Render-surface authority supplies the canonical surface plan.
Scene-transition authority supplies canonical stage descriptors and stage epoch.
Inspection authority consumes context/frame admission evidence.
Committed-frame diagnostics records context/resource generations.
```
