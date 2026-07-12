# Next steps: The Unmapped House

**Timestamp:** `2026-07-12T08-10-36-04-00`

## Goal

Preserve the current three-scene story, 450 ms pacing, fixed 16:9 composition, side-panel inspection path and Three.js presentation while making content, startup, persistence, interaction, delayed completion, modal focus, transitions, lifecycle and visible-frame proof deterministic.

## Plan ledger

### 1. Canonical StoryManifest
- [ ] Add stable manifest identity, versions, indexes, validation, freeze and fingerprint.

### 2. Versioned StorySnapshot startup authority
- [ ] Replace raw object spread with typed parse, migration, reconciliation and startup results.

### 2a. Browser Storage Commit and Cross-Tab Convergence Authority
- [ ] Observe storage capability and support explicit volatile mode.
- [ ] Add writer session identity and monotonic snapshot revisions.
- [ ] Require expected predecessor revisions for commits.
- [ ] Add stale-writer rejection and a named manifest-aware conflict policy.
- [ ] Return typed read, commit and reset results.
- [ ] Add `storage` event admission and cross-tab reconciliation.
- [ ] Add a reset barrier so stale tabs cannot resurrect deleted progress.
- [ ] Publish detached storage observations and a bounded effect journal.
- [ ] Correlate durable or volatile revision with narrative and future frames.

### 3. Pointer observation and hotspot-pick authority
- [ ] Unify canvas and side-panel activation around canonical id-only commands.

### 4. Inspection and completion proof
- [ ] Record immutable inspection receipts and derive one scene-completion proof.

### 4a. Completion Timer Generation Authority
- [ ] Replace the raw `setTimeout()` call with a typed schedule command.
- [ ] Allocate a stable timer id and monotonic timer generation.
- [ ] Freeze runtime session, scene, completion proof, transition revision and modal generation in callback context.
- [ ] Retain the timeout handle through a cancellable timer lease.
- [ ] Cancel or invalidate incompatible timers on transition, terminal route, reset and session stop.
- [ ] Reject stale callbacks before narrative or modal mutation.
- [ ] Retire each lease exactly once after cancellation or admitted fire.
- [ ] Return typed scheduled, cancelled, rejected and fired results.
- [ ] Publish detached timer observations and a bounded journal.

### 4b. Modal Focus and Continue Admission Authority
- [ ] Introduce explicit closed, opening, open, continuing and closing modal states.
- [ ] Make the closed interlude inert and remove Continue from sequential focus.
- [ ] Add `role="dialog"` and `aria-modal="true"` only for committed open state.
- [ ] Capture focus origin and move focus to the admitted Continue control.
- [ ] Suspend background stage and inspection commands while the modal is open.
- [ ] Trap sequential focus within the modal and restore it only when valid.
- [ ] Require current scene, modal generation and unconsumed completion proof for Continue.
- [ ] Return typed modal-open, modal-close and Continue-admission results.

### 5. Atomic Continue transition
- [ ] Prepare successor story, stage, hotspot, narrative and persistence candidates before mutation.
- [ ] Cancel predecessor timer leases before committing successor ownership.
- [ ] Consume the modal-authorized completion proof exactly once.

### 6. Narrative Projection Authority
- [ ] Make DOM and aria-live output consume a typed, revisioned narrative projection.

### 7. Runtime Session Lifecycle and Scene Resource Retirement Authority
- [ ] Add session identity, callback leases, scene-resource generations and ordered disposal.
- [ ] Retain predecessor resources until the first accepted successor frame.

### 8. Render Surface Resolution Authority
- [ ] Separate CSS composition from internal GPU resolution and commit surface revisions.

### 9. WebGL Context Recovery Authority
- [ ] Coordinate context loss, restoration and replacement resource generations.

### 10. Committed Frame Diagnostics Authority
- [ ] Add monotonic frame identity and immutable frame inputs.
- [ ] Return typed stage and post pass results.
- [ ] Commit public frame state only after visible canvas acknowledgement.
- [ ] Correlate story, timer, narrative, modal, durable snapshot and screenshots with frame ids.

## Timer result contracts

```txt
CompletionTimerScheduledResult
  commandId
  runtimeSessionId
  timerId
  timerGeneration
  sceneId
  completionProofId
  transitionRevision
  delayMs
  dueAtMs
  status
  reason

CompletionTimerFiredResult
  timerId
  timerGeneration
  expectedSceneId
  observedSceneId
  completionProofId
  expectedTransitionRevision
  observedTransitionRevision
  modalGeneration
  status
  openInterludeCommandId
  reason
  resolvedAtMs
```

## Required fixture rows

```txt
completion-schedules-one-retained-timer
callback-context-freezes-completing-scene
transition-before-delay-cancels-timer
transition-before-delay-stale-callback-rejected
successor-interlude-does-not-open-from-predecessor-timer
terminal-copy-survives-predecessor-delay
reset-invalidates-live-timers
session-stop-cancels-live-timers
duplicate-cancel-idempotent
cancelled-timer-cannot-fire
fired-timer-retires-lease-once
timer-observation-detached-json-safe
timer-journal-bounded
```

## Browser timer-order smoke

```txt
complete scene A
capture scheduled timer identity
activate an admitted transition before 450 ms
verify scene B becomes current
wait beyond the original due time
verify scene B interlude remains closed
verify stale timer result reports rejection or cancellation
repeat on final scene with terminal projection
verify terminal copy is not overwritten
```

## Implementation order

```txt
1. StoryManifest Authority
2. StorySnapshot Startup Authority
2a. Browser Storage Commit and Cross-Tab Convergence Authority
3. Pointer and Hotspot-Pick Authority
4. Inspection and Completion Authority
4a. Completion Timer Generation Authority
4b. Modal Focus and Continue Admission Authority
5. Atomic Continue Transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed Frame Diagnostics Authority
```

## Do not do first

```txt
new story rooms or branches
inventory
audio or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```
