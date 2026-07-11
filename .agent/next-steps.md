# Next steps: The Unmapped House

Timestamp: `2026-07-11T04-00-07-04-00`

## Goal

Preserve the current three-scene story, copy, pacing and visual output while making Continue a typed transaction that commits durable story state, StageKit resources, DOM projection and the first rendered frame as one recoverable operation.

## Plan ledger

### Prerequisites

- [ ] Add a versioned `StorySnapshot` with manifest identity, save revision and state fingerprint.
- [ ] Put localStorage behind an injected adapter with typed load, write and clear results.
- [ ] Add explicit `exploring`, `interlude_pending`, `interlude_open`, `transitioning`, `recovering` and `terminal` phases.
- [ ] Normalize Continue into a command with request id, expected scene, phase, story revision and stage epoch.

### Transition admission

- [ ] Accept Continue only from committed `interlude_open` state with scene-scoped completion proof.
- [ ] Reject scene, phase, story-revision and stage-epoch mismatches.
- [ ] Make duplicate Continue requests idempotent.
- [ ] Create a stable `transitionId` before any mutation or side effect.

### Candidate story state

- [ ] Derive the next story snapshot without mutating the committed snapshot.
- [ ] Validate target scene, route, log and terminal transition.
- [ ] Keep the current interlude and scene committed until the transaction succeeds.

### Detached stage preparation

- [ ] Split `StageKit.loadScene()` into `prepareScene`, `commitPreparedScene` and `discardPreparedScene`.
- [ ] Validate descriptors before clearing or replacing live resources.
- [ ] Build the replacement in a detached group with an acquisition ledger.
- [ ] Return typed preparation success or failure with resource counts.

### Atomic commit

- [ ] Persist the candidate story snapshot with expected-revision checking.
- [ ] Atomically swap the prepared stage only after durable success.
- [ ] Project DOM only from the committed story snapshot.
- [ ] Correlate story revision, transition id, stage epoch and stage commit id.
- [ ] Acknowledge the first frame that rendered the committed stage.

### Rollback and retirement

- [ ] Discard prepared resources when persistence fails.
- [ ] Restore prior story, interlude and stage if stage commit fails.
- [ ] Keep prior stage resources alive until the replacement first frame is acknowledged.
- [ ] Dispose retired geometry, materials and hotspot resources exactly once.
- [ ] Return `accepted`, `rejected`, `duplicate`, `failed` or `rolled_back` results.

### Lifecycle

- [ ] Retain and cancel RAF and timer ids.
- [ ] Remove keyboard, resize, pointer and click listeners on dispose.
- [ ] Add idempotent runtime and `StageKit.dispose()` operations.
- [ ] Reject load, pick and frame operations after terminal disposal.

### Validation

- [ ] Add `scripts/validate-stage-preparation.mjs`.
- [ ] Add `scripts/validate-story-stage-transition.mjs`.
- [ ] Add `scripts/validate-transition-rollback.mjs`.
- [ ] Add `scripts/validate-stage-resource-retirement.mjs`.
- [ ] Add `scripts/validate-first-frame-ack.mjs`.
- [ ] Wire behavioral fixtures into `npm run check` after syntax checks.
- [ ] Add browser fault-injection smoke for stage and storage failure.

## Required fixture rows

```txt
invalid-descriptor-rejected-before-live-clear
stage-prepare-failure-keeps-prior-story-and-stage
save-failure-discards-prepared-stage
stage-commit-failure-restores-prior-stage
projection-failure-remains-recoverable
first-frame-timeout-is-observable
accepted-transition-correlates-story-save-stage-frame
prior-stage-disposed-after-first-frame-only
repeated-continue-does-not-skip-scene
final-continue-commits-terminal-once
reload-after-accepted-transition-restores-next-scene
reload-after-failed-transition-restores-prior-scene
transition-journal-json-safe-and-bounded
```

## Implementation order

```txt
1. versioned durable StorySnapshot and typed persistence results
2. explicit phase reducer and Continue admission
3. pure transition candidate
4. detached StageKit preparation
5. durable story write with expected revision
6. atomic stage and DOM commit
7. first-frame acknowledgement
8. prior-stage retirement and disposal
9. rollback, lifecycle and bounded diagnostics
10. Node fixtures and browser fault smoke
```

## Next safe ledge

```txt
TheUnmappedHouse Atomic Story/Stage Transition Authority
+ Prepare/Commit/Discard and First-Frame Fixture Gate
```

## Do not do first

```txt
new rooms or branches
inventory
sound or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```