# Session generation and ordered dispose contract

Timestamp: `2026-07-12T01-41-56-04-00`

## Plan ledger

**Goal:** define the exact lifecycle state machine, ownership transfer and disposal order.

- [x] Define states and transitions.
- [x] Define session and resource generation invariants.
- [x] Define startup rollback and idempotent disposal.
- [ ] Implement and validate.

## State machine

```txt
ABSENT
  -> CONSTRUCTING
  -> READY
  -> STOPPING
  -> DISPOSED

CONSTRUCTING
  -> FAILED
  -> rollback to DISPOSED
```

## Runtime session record

```txt
RuntimeSession
  runtimeSessionId
  sessionGeneration
  lifecycleState
  lifecycleRevision
  callbackFence
  rafLease
  listenerLeases
  timeoutLeases
  activeSceneResourceGeneration
  retiringResourceGenerations
  rendererResourceInventory
  lastCommittedFrameId
```

## Scene generation transaction

```txt
prepare candidate inventory
  -> validate all resources
  -> commit candidate generation
  -> render and acknowledge first frame
  -> mark predecessor retiring
  -> dispose predecessor resources
  -> publish retirement receipt
```

## Ordered disposal

```txt
reject new commands
increment callback fence
cancel RAF
cancel timeouts
remove listeners
retire active scene resources
dispose post plane geometry/material
dispose render target
dispose renderer and force/lose context per policy
remove canvas
clear retained references
publish DISPOSED result
```

## Idempotence

Repeated stop/dispose commands return the original stable result and must not dispose the same resource twice. Restart is a new start command with a greater session generation, not mutation of a disposed record.

## Failure policy

Partial startup and partial scene construction register resources immediately in a cleanup stack. Failure unwinds the stack in reverse order and publishes complete cleanup evidence.
