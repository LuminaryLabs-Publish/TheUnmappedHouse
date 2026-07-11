# Next steps: The Unmapped House

Timestamp: `2026-07-11T06-21-57-04-00`

## Goal

Preserve the current three-scene story, copy, pacing and visual output while making every hotspot inspection a canonical, scene-scoped, idempotent transaction with clue provenance, completion proof, persistence results and frame correlation.

## Plan ledger

### Manifest and state prerequisites

- [ ] Add a versioned story manifest id and fingerprint.
- [ ] Add explicit scene/hotspot/clue ownership indexes.
- [ ] Add a versioned `StorySnapshot` with story revision, save revision and phase.
- [ ] Reconcile persisted inspections and clues against the canonical manifest.
- [ ] Drop unknown, orphaned and cross-scene authority data during reconciliation.

### Command normalization

- [ ] Replace descriptor-object input with `sceneId` and `hotspotId` identities.
- [ ] Add `commandId`, `source`, `inputSequence`, expected story revision and expected stage epoch.
- [ ] Normalize side-panel and raycast input through one command queue.
- [ ] Convert raycast hits into typed pick observations with frame and stage provenance.

### Admission

- [ ] Accept inspections only during an inspectable committed story phase.
- [ ] Require command scene id to equal the committed active scene.
- [ ] Require hotspot membership in the canonical scene index.
- [ ] Reject stale story revisions and stale stage epochs.
- [ ] Make command replay and same-hotspot dual ingress idempotent.
- [ ] Return explicit rejection and duplicate reasons.

### Scene-scoped mutation

- [ ] Derive label, text, log copy and clue grants from canonical manifest data only.
- [ ] Record one immutable inspection receipt per accepted first inspection.
- [ ] Record clue-grant receipts with owner scene, source hotspot and command id.
- [ ] Treat supported re-read as an explicit no-op/read result.
- [ ] Build a candidate story snapshot before persistence or projection.

### Completion and interlude

- [ ] Evaluate completion from scene-owned clue grant receipts.
- [ ] Emit one immutable `SceneCompletionProof` per scene revision.
- [ ] Schedule the interlude exactly once from the committed completion result.
- [ ] Persist pending/open interlude phase.
- [ ] Require the completion proof for Continue admission.

### Persistence and projection

- [ ] Put localStorage behind typed load, write and clear results.
- [ ] Commit inspection, clues, log, phase and save revision as one transaction.
- [ ] Project story text, checkmarks, notebook and debug state from the committed result.
- [ ] Retain a bounded JSON-safe command/result journal.
- [ ] Correlate the committed result to the matching stage epoch and feedback frame.

### Transition companion

- [ ] Keep the existing atomic Continue transition plan after inspection authority.
- [ ] Split `StageKit.loadScene()` into prepare, commit and discard operations.
- [ ] Commit story, save, stage, DOM and first frame under one transition id.
- [ ] Dispose retired stage resources after first-frame acknowledgement.

### Lifecycle

- [ ] Retain and cancel RAF and timer ids.
- [ ] Remove keyboard, resize, pointer and click listeners on dispose.
- [ ] Add idempotent runtime and `StageKit.dispose()` operations.
- [ ] Reject load, pick and frame operations after terminal disposal.

### Validation

- [ ] Add story-manifest and hotspot-index fixtures.
- [ ] Add inspection admission and clue-provenance fixtures.
- [ ] Add dual-ingress idempotency and stage-epoch fixtures.
- [ ] Add scene-completion-proof and reload fixtures.
- [ ] Retain the planned transition, rollback, first-frame and retirement fixtures.
- [ ] Wire behavioral fixtures into `npm run check` after syntax checks.

## Required inspection fixture rows

```txt
manifest-has-three-scenes-nine-hotspots-nine-owned-clues
unknown-scene-rejected
unknown-hotspot-rejected
cross-scene-hotspot-rejected
caller-supplied-grants-ignored
stale-story-revision-rejected
stale-stage-epoch-rejected
same-command-idempotent
side-panel-raycast-same-hotspot-idempotent
repeat-inspection-explicit-no-op
final-clue-creates-one-completion-proof
interlude-scheduled-once
accepted-result-correlates-to-feedback-frame
reload-preserves-authoritative-provenance
journal-json-safe-and-bounded
```

## Implementation order

```txt
1. versioned story manifest and StorySnapshot
2. canonical hotspot index and persisted-state reconciliation
3. typed inspection command and pick observation
4. admission, duplicate and stale policies
5. scene-scoped inspection and clue receipts
6. completion proof and one-shot interlude result
7. typed persistence and feedback projection
8. frame correlation and bounded journal
9. inspection authority fixtures
10. atomic Continue transition and lifecycle fixtures
```

## Next safe ledge

```txt
TheUnmappedHouse Inspection Command Authority
+ Scene/Hotspot/Clue and Dual-Ingress Fixture Gate
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
