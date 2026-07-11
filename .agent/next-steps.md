# Next steps: The Unmapped House

Timestamp: `2026-07-11T01-38-28-04-00`

## Goal

Preserve the current three-scene story, copy, pacing and visual output while making scene completion, delayed interludes, Continue admission, transitions and terminal progress explicit, durable and reload-safe.

## Plan ledger

### Durable snapshot prerequisite

- [ ] Add a versioned `StorySnapshot` with manifest identity, save revision and state fingerprint.
- [ ] Validate scene, hotspot, clue, inspection, route and log fields.
- [ ] Put localStorage behind an injected adapter with typed load, write and clear results.
- [ ] Reconcile legacy, corrupt, unavailable and source-mismatched saves explicitly.

### Story phase authority

- [ ] Add phases: `exploring`, `interlude_pending`, `interlude_open`, `transitioning`, `recovering` and `terminal`.
- [ ] Persist phase, current scene, completion proof and terminal state.
- [ ] Make scene completion evidence scene-scoped and source-versioned.
- [ ] Reject impossible phase/snapshot combinations during load reconciliation.

### Interlude authority

- [ ] Replace direct `setTimeout` use with an injected timer adapter.
- [ ] Persist `interludeTargetSceneId`, `interludeReadyAt`, source command id and save revision.
- [ ] Retain timer ids and cancel them on transition, reset and dispose.
- [ ] On boot, open an already-ready interlude or schedule only the remaining delay.
- [ ] Ignore stale timer callbacks whose scene, phase, revision or runtime epoch no longer matches.

### Continue admission

- [ ] Normalize UI activation into a canonical `ContinueStory` command.
- [ ] Include request id, origin, expected scene, expected phase and expected save revision.
- [ ] Accept Continue only from `interlude_open` with valid completion proof.
- [ ] Return accepted, rejected, duplicate or no-op results.
- [ ] Make repeated Continue commands idempotent.
- [ ] Persist terminal state on the final Continue.

### Projection and stage correlation

- [ ] Project interlude visibility and button availability from the committed phase.
- [ ] Correlate phase revision, story fingerprint, stage commit id and stage epoch.
- [ ] Prevent a story transition from becoming visible before durable and stage commits agree.
- [ ] Keep the previous committed scene when persistence or stage preparation fails.
- [ ] Expose bounded JSON-safe phase, timer, command and transition rows.

### Lifecycle

- [ ] Give the browser story runtime an explicit session id and runtime epoch.
- [ ] Retain and cancel RAF and timer ids.
- [ ] Remove keyboard, resize, pointer and click listeners on dispose.
- [ ] Add idempotent `StageKit.dispose()` and runtime disposal.
- [ ] Dispose retired geometries, materials, targets and renderer resources.

### Validation

- [ ] Add `scripts/validate-story-phase-recovery.mjs`.
- [ ] Add `scripts/validate-interlude-timer.mjs`.
- [ ] Add `scripts/validate-continue-admission.mjs`.
- [ ] Add `scripts/validate-terminal-reload.mjs`.
- [ ] Add `scripts/validate-phase-stage-correlation.mjs`.
- [ ] Wire behavioral fixtures into `npm run check` after syntax checks.
- [ ] Add browser reload smoke for pending, open, transitioning and terminal phases.

## Required fixture rows

```txt
fresh-scene-starts-exploring
final-inspection-commits-interlude-pending
reload-before-deadline-schedules-remaining-delay
reload-after-deadline-opens-interlude-immediately
completed-scene-never-reloads-with-hidden-progress
already-inspected-click-does-not-duplicate-timer
stale-timer-scene-rejected
stale-timer-save-revision-rejected
reset-cancels-pending-interlude
continue-before-completion-rejected
continue-before-interlude-open-rejected
continue-from-open-interlude-accepted-once
duplicate-continue-is-idempotent
transition-failure-restores-prior-phase-and-stage
final-continue-persists-terminal-state
terminal-reload-restores-terminal-projection
phase-command-timer-stage-rows-json-safe
```

## Implementation order

```txt
1. versioned durable StorySnapshot and load reconciliation
2. pure story-phase reducer and completion proof
3. injected timer adapter and persisted interlude deadline
4. boot phase recovery
5. typed Continue command, admission and result
6. durable transition plus StageKit prepare/commit/discard
7. persisted terminal state
8. lifecycle teardown and JSON-safe journals
9. Node fixtures and browser reload smoke
```

## Next safe ledge

```txt
TheUnmappedHouse Story Phase Recovery Authority
+ Interlude/Continue Admission Fixture Gate
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
