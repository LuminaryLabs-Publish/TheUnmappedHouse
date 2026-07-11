# Next steps: The Unmapped House

Timestamp: `2026-07-11T10-12-03-04-00`

## Goal

Preserve the current three-scene story, copy, 450 ms interlude pacing and visual output while making definition, persistence, inspection and Continue transitions deterministic, recoverable and fixture-backed.

## Plan ledger

### Prerequisite 1: canonical story and persistence

- [ ] Add a stable StoryManifest id, schema version and deterministic fingerprint.
- [ ] Normalize and validate scene, hotspot, clue, camera, stage, material and post descriptors.
- [ ] Build immutable scene, hotspot and clue indexes.
- [ ] Replace the raw save object with a versioned StorySnapshot.
- [ ] Add typed load admission, v1 migration and canonical reconciliation.
- [ ] Add typed save results, save revisions, state fingerprints and a bounded persistence journal.

### Prerequisite 2: inspection authority

- [ ] Convert side-panel and raycast input into one canonical inspection command.
- [ ] Admit commands against scene id, hotspot id, story revision and stage epoch.
- [ ] Resolve text and clue grants from the canonical manifest, not caller descriptors.
- [ ] Emit scene-scoped clue receipts and a canonical completion proof.
- [ ] Make duplicate inspection explicit and mutation-free.

### Continue command and admission

- [ ] Add a stable command id and monotonic input sequence.
- [ ] Include expected story revision, expected stage epoch and completion-proof id.
- [ ] Classify commands as `accepted`, `blocked`, `stale`, `duplicate`, `terminal_noop` or `failed`.
- [ ] Reject Continue before canonical completion.
- [ ] Reject stale Continue after another transition commits.
- [ ] Ensure repeated final Continue is a typed no-op.

### Transition plan

- [ ] Resolve the target scene from canonical manifest order.
- [ ] Build an immutable plan containing transition id, source/target scene ids, story revisions, source/target stage epochs and expected save revision.
- [ ] Build the candidate StorySnapshot without mutating committed state.
- [ ] Carry manifest and scene-definition fingerprints into stage preparation.

### Detached stage preparation

- [ ] Refactor StageKit to prepare a detached group and resource bundle.
- [ ] Build camera, fog, post settings, layers, props and hotspot meshes without clearing the live stage.
- [ ] Validate resource counts and hotspot bindings.
- [ ] Return a typed preparation result.
- [ ] Dispose all candidate resources on preparation failure.

### Durable and atomic commit

- [ ] Write the candidate StorySnapshot through the typed persistence transaction.
- [ ] Atomically swap the prepared stage bundle into the live scene.
- [ ] Advance story revision and stage epoch together.
- [ ] Project title, text, hotspot list, interlude and debug DOM from the committed snapshot.
- [ ] Emit one typed transition result containing save revision, story revision and stage epoch.

### Rollback and recovery

- [ ] Leave the prior story, DOM, save and stage untouched for all pre-commit failures.
- [ ] Define compensation for durable-save success followed by live-stage commit failure.
- [ ] Retain the previous stage bundle until the new live swap succeeds.
- [ ] Record rollback reason, affected revisions and resource counts.
- [ ] Make rollback idempotent.

### Resource retirement

- [ ] Track every geometry, material, mesh, group and hotspot resource per stage epoch.
- [ ] Dispose the previous stage bundle only after the new swap commits.
- [ ] Add idempotent `disposeSceneBundle()` and `StageKit.dispose()`.
- [ ] Retire render target, post resources, renderer, listeners, timeout leases and RAF during full disposal.
- [ ] Expose bounded JSON-safe resource-retirement diagnostics.

### First-frame acknowledgement

- [ ] Add monotonic frame ids.
- [ ] Tag render work with stage epoch and story revision.
- [ ] Acknowledge the first frame that contains the committed stage.
- [ ] Correlate camera, hotspot bindings, post settings and DOM projection.
- [ ] Distinguish `stage_committed` from `first_frame_visible`.

### Interlude timing

- [ ] Replace raw timeout with a cancellable lease.
- [ ] Fence the callback by scene id, story revision, stage epoch and runtime session.
- [ ] Make duplicate completion scheduling explicit.
- [ ] Cancel stale leases during transition, reset and disposal.
- [ ] Preserve the current 450 ms pacing.

### Validation

- [ ] Add `scripts/validate-story-manifest.mjs`.
- [ ] Add `scripts/validate-save-admission.mjs`.
- [ ] Add `scripts/validate-inspection-authority.mjs`.
- [ ] Add `scripts/validate-continue-transition.mjs`.
- [ ] Add `scripts/validate-stage-resource-disposal.mjs`.
- [ ] Add `scripts/validate-first-frame-ack.mjs`.
- [ ] Add a browser smoke for scene one -> two -> three -> terminal.
- [ ] Wire fixtures into `npm run check`.

## Required Continue fixture rows

```txt
continue-before-completion-blocked
continue-with-valid-completion-proof-accepted
stale-story-revision-rejected
stale-stage-epoch-rejected
duplicate-command-id-no-mutation
transition-plan-deterministic
target-scene-derived-from-manifest-order
story-state-unchanged-during-detached-preparation
injected-layer-failure-retains-old-stage
injected-prop-failure-disposes-candidate-resources
injected-hotspot-failure-retains-old-story-and-save
storage-failure-retains-old-live-stage
successful-commit-advances-story-save-and-stage-once
old-stage-resources-disposed-exactly-once
first-frame-receipt-matches-story-revision-and-stage-epoch
interlude-timeout-cancelled-after-transition
terminal-continue-produces-idempotent-noop
transition-journal-json-safe-and-bounded
```

## Implementation order

```txt
1. StoryManifest and StorySnapshot
2. save admission, migration and reconciliation
3. inspection authority and completion proof
4. Continue command and immutable transition plan
5. detached StageKit preparation
6. durable snapshot and atomic live-stage commit
7. rollback, resource retirement and first-frame acknowledgement
8. browser transition smoke
9. full runtime lifecycle disposal
```

## Current audit ledge

```txt
TheUnmappedHouse Atomic Story/Stage Continue Transition Authority
+ Rollback, Resource Retirement and First-Frame Fixture Gate
```

## Do not do first

```txt
new rooms or story branches
inventory
audio or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```
