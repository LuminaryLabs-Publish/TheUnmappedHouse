# Next steps: The Unmapped House

Timestamp: `2026-07-11T00-00-26-04-00`

## Next safe ledge

```txt
TheUnmappedHouse Durable Story Commit Authority
+ Persistence Failure and Recovery Fixture Gate
```

## Goal

Preserve the current three-scene route, copy, pacing and visuals while making every visible story revision attributable to a durable save revision or an explicit recoverable transaction. Storage denial, quota errors, serialization failures, interrupted transitions and clear failures must return typed results rather than leaving memory, DOM, timers, StageKit and localStorage on different revisions.

## Plan ledger

### Pure story and source authority

- [ ] Add a versioned story schema, manifest id and source fingerprint.
- [ ] Validate scene, hotspot, clue and route identity.
- [ ] Introduce a detached immutable `StorySnapshot`.
- [ ] Add explicit phases: `exploring`, `interlude_pending`, `interlude_open`, `transitioning`, `recovering` and `terminal`.
- [ ] Derive completion from scene-scoped canonical evidence.

### Persistence capability and results

- [ ] Put localStorage behind an injected adapter.
- [ ] Admit storage capability before StageKit resource acquisition.
- [ ] Return typed load status: accepted, migrated, repaired, reset, unavailable or failed.
- [ ] Return typed write status: committed, rejected or failed.
- [ ] Return typed clear status: cleared, already-empty, unavailable or failed.
- [ ] Distinguish invalid JSON, access denial, serialization failure, quota failure and stale revision.

### Versioned durable envelope

- [ ] Add `schemaVersion`, `storyManifestId` and `storySourceFingerprint`.
- [ ] Add monotonic `saveRevision` and `stateFingerprint`.
- [ ] Persist phase, completion proof, interlude readiness and terminal state.
- [ ] Add `pendingTransaction` for interrupted scene transitions.
- [ ] Record command, transaction, persistence attempt and stage commit identity.
- [ ] Reconcile old or corrupt saves through typed results.

### Command admission

- [ ] Normalize side-panel and raycast inputs into canonical `InspectHotspot` commands.
- [ ] Add canonical `ContinueStory` and `ResetStory` commands.
- [ ] Include request id, origin, expected scene, expected phase and expected save revision.
- [ ] Reject unknown, stale, duplicate and wrong-phase commands before mutation.
- [ ] Produce a pure next snapshot and effect plan before browser effects.

### Durable commit protocol

- [ ] For inspection, write the next snapshot before projecting success or scheduling an interlude.
- [ ] For scene transitions, prepare StageKit resources without replacing the committed stage.
- [ ] Durably record a pending transition before committing the prepared stage.
- [ ] Finalize the save envelope after stage commit succeeds.
- [ ] Resolve interrupted pending transitions deterministically on reload.
- [ ] Keep the previous committed story and stage when persistence preparation fails.
- [ ] Expose a recoverable state when finalization fails after stage commit.
- [ ] Make repeated commands idempotent by request and save revision.

### Projection and lifecycle

- [ ] Project normal UI only from the committed snapshot.
- [ ] Schedule interlude readiness only from a committed phase/deadline.
- [ ] Correlate each rendered scene with save revision, state fingerprint, stage commit id and epoch.
- [ ] Add a startup acquisition ledger and reverse-order cleanup stack.
- [ ] Retain and cancel RAF ids.
- [ ] Remove window, canvas and keyboard listeners during rollback/dispose.
- [ ] Dispose render targets, materials, geometries and renderer on terminal boot failure.
- [ ] Add idempotent `StageKit.dispose()` and runtime-session disposal.

### Diagnostics

- [ ] Add bounded JSON-safe command, persistence, recovery and stage rows.
- [ ] Expose persistence capability and mode.
- [ ] Expose current and pending save revisions.
- [ ] Expose the last load, write, clear and recovery results.
- [ ] Keep DOM nodes, errors with cyclic fields and raw Three.js objects out of diagnostics.

### Validation

- [ ] Add `scripts/validate-story-source.mjs`.
- [ ] Add `scripts/validate-save-reconciliation.mjs`.
- [ ] Add `scripts/validate-story-phase-resume.mjs`.
- [ ] Add `scripts/validate-persistence-results.mjs`.
- [ ] Add `scripts/validate-story-commit-protocol.mjs`.
- [ ] Add `scripts/validate-boot-rollback.mjs`.
- [ ] Wire them into `npm run check` after syntax checks.
- [ ] Add browser smoke for storage denial, quota failure, interrupted transition, clear failure and remount.

## Required fixture rows

```txt
fresh-envelope-commits-revision-one
legacy-v1-save-migrates-with-result
invalid-json-distinguished-from-access-denial
successful-write-increments-save-revision
stale-write-rejected-before-mutation
inspection-write-failure-projects-no-success-state
final-inspection-write-failure-schedules-no-interlude
continue-persistence-failure-keeps-previous-stage
pending-transition-written-before-stage-commit
pending-transition-recovers-exactly-once
finalize-write-failure-remains-recoverable
finalized-transition-reloads-target-scene
reset-clear-failure-does-not-reload
boot-storage-denial-acquires-no-stage-resources
boot-write-failure-releases-raf-listeners-and-gpu
command-persistence-stage-result-json-safe
```

## Implementation order

```txt
1. pure StorySnapshot, source schema and fingerprint
2. injected storage adapter and typed persistence results
3. versioned envelope, save revision and reconciliation
4. story phase reducer and typed commands
5. inspection durable-commit path
6. StageKit prepare/commit/discard companion
7. recoverable scene-transition commit protocol
8. projection from committed revision
9. boot cleanup stack and idempotent disposal
10. deterministic fixtures and browser smoke
```

## First implementation slice

```txt
storage adapter
  -> PersistenceLoadResult
  -> PersistenceWriteResult
  -> PersistenceClearResult
  -> versioned envelope
  -> save revision
  -> deterministic failure fixtures
```

## Second implementation slice

```txt
pure InspectHotspot reducer
  -> write next envelope
  -> project committed result
  -> derive persisted interlude readiness
```

## Third implementation slice

```txt
StageKit prepare/commit/discard
  -> pending transition envelope
  -> final save revision
  -> recovery on reload
  -> browser denial/quota/interruption smoke
```

## Validation target

```txt
npm run check
```

## Companion queue

The existing resume-safe phase authority and Atomic Stage Commit work remain required. Story rules own the next snapshot, persistence authority owns durable revisions and recovery, and StageKit owns visual preparation, commit and disposal.

## Do not do first

```txt
new story rooms or branches
inventory
sound or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```