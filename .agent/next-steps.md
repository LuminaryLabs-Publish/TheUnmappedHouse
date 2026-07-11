# Next steps: The Unmapped House

Timestamp: `2026-07-11T12-08-47-04-00`

## Goal

Preserve the current three-scene story, copy, 450 ms interlude pacing, fixed composition, and visual output while making story definitions, persistence, inspection, completion, Continue transitions, runtime callbacks, and Three.js resources deterministic and fixture-backed.

## Plan ledger

### Prerequisite 1: canonical story manifest

- [ ] Add a stable `StoryManifest` id and schema version.
- [ ] Validate unique scene ids and unique scene-scoped hotspot ids.
- [ ] Build canonical scene, hotspot, clue, and requirement indexes.
- [ ] Validate that every grant and requirement resolves to declared ownership.
- [ ] Freeze admitted definitions and publish a deterministic manifest fingerprint.

### Prerequisite 2: admitted story snapshot and persistence

- [ ] Replace the raw `.v1` object with a versioned `StorySnapshot` envelope.
- [ ] Add typed load admission and legacy-v1 migration.
- [ ] Reconcile unknown scenes, hotspots, clues, route rows, and malformed collections.
- [ ] Add monotonic `storyRevision` and `saveRevision`.
- [ ] Reconstruct clue provenance and completion proof from canonical inspection receipts.
- [ ] Add typed load, save, clear, migration, and reconciliation results.

### Inspection command authority

- [ ] Replace descriptor ingress with id-only `InspectionCommand` envelopes.
- [ ] Include `commandId`, input sequence, source, scene id, hotspot id, expected story revision, and expected stage epoch.
- [ ] Resolve the canonical hotspot only after command admission.
- [ ] Reject unknown, stale-scene, stale-story, stale-stage, duplicate-sequence, and cross-scene commands.
- [ ] Make side-panel, raycast, replay, and future automation use the same authority path.
- [ ] Return typed immutable `InspectionResult` receipts.

### Pick observation separation

- [ ] Make StageKit return a `HotspotPickObservation`, not a mutable story descriptor.
- [ ] Limit pick output to hotspot id, stage epoch, frame id, pointer coordinates, distance, and optional mesh identity.
- [ ] Keep copy, clue grants, and completion requirements out of Three.js `userData` mutation ingress.
- [ ] Reject observations from retired stage epochs.

### Scene-scoped inspection and clue provenance

- [ ] Replace boolean inspection flags with immutable inspection receipts.
- [ ] Correlate each receipt to scene, hotspot, command, story revision, stage epoch, and source.
- [ ] Grant only the canonical clues owned by the admitted hotspot.
- [ ] Record clue provenance through inspection receipt ids.
- [ ] Treat exact duplicate inspection as a typed no-mutation result.
- [ ] Define re-read projection as an explicit presentation command, not a hidden story mutation.

### Completion proof authority

- [ ] Derive completion from accepted scene-scoped inspection receipts.
- [ ] Create one immutable `SceneCompletionProof` per completed scene revision.
- [ ] Include required hotspot ids, accepted receipt ids, granted clue ids, story revision, and proof fingerprint.
- [ ] Prevent duplicate proof creation and duplicate interlude scheduling.
- [ ] Make Continue consume a specific unconsumed proof.
- [ ] Persist proof identity and consumption state.

### Inspection transaction

- [ ] Build a candidate StorySnapshot from the admitted command.
- [ ] Persist the candidate before projecting committed state.
- [ ] Keep live state unchanged on persistence failure.
- [ ] Commit state, DOM, debug projection, and interlude lease from one result.
- [ ] Publish before/after fingerprints and a bounded journal row.

### Dual-ingress parity

- [ ] Prove side-panel and raycast produce the same command for the same hotspot.
- [ ] Prove both paths produce the same result, revision, receipt, clue grants, completion proof, and persisted snapshot.
- [ ] Prove repeated mixed ingress cannot double-grant clues or schedule multiple interludes.
- [ ] Prove stale side-panel closures and retired raycast observations are rejected.

### Atomic Continue transition

- [ ] Admit Continue against completion proof, story revision, and stage epoch.
- [ ] Prepare the successor stage in a detached group.
- [ ] Build and durably persist a candidate StorySnapshot.
- [ ] Commit successor story and stage atomically.
- [ ] Acknowledge the first visible successor frame.
- [ ] Retire predecessor resources only after commit and frame acknowledgement.
- [ ] Roll back or recover explicitly on failure.

### Runtime session lifecycle

- [ ] Add stable `sessionId` and monotonic `sessionGeneration`.
- [ ] Route interaction, timeout, and frame work through current-generation admission.
- [ ] Retain and retire RAF, listener, and timeout leases.
- [ ] Inventory and dispose scene, render-target, post, renderer, canvas, and context resources.
- [ ] Return typed idempotent stop, dispose, and reset results.

### Validation

- [ ] Add `validate-story-manifest.mjs`.
- [ ] Add `validate-story-snapshot-admission.mjs`.
- [ ] Add `validate-inspection-command.mjs`.
- [ ] Add `validate-inspection-duplicate.mjs`.
- [ ] Add `validate-stale-inspection.mjs`.
- [ ] Add `validate-clue-provenance.mjs`.
- [ ] Add `validate-scene-completion-proof.mjs`.
- [ ] Add `validate-inspection-persistence-rollback.mjs`.
- [ ] Add `validate-dual-ingress-parity.mjs`.
- [ ] Wire fixtures into `npm run check` after syntax checks.
- [ ] Add a browser raycast/button parity smoke.

## Required fixture rows

```txt
manifest-scene-hotspot-clue-index-valid
canonical-hotspot-resolution-by-scene-and-id
side-panel-command-id-only
raycast-observation-id-only
same-hotspot-dual-ingress-command-parity
same-hotspot-dual-ingress-result-parity
stale-scene-descriptor-rejected
stale-story-revision-rejected
stale-stage-epoch-rejected
unknown-hotspot-rejected
cross-scene-hotspot-rejected
duplicate-sequence-rejected
first-inspection-applied-once
exact-duplicate-no-story-mutation
re-read-presentation-does-not-regrant
canonical-clues-granted-once
clue-provenance-points-to-inspection-receipt
completion-requires-current-scene-receipts
forged-global-clue-does-not-complete
completion-proof-created-once
completion-proof-fingerprint-stable
interlude-lease-created-once-per-proof
persistence-failure-keeps-live-state-unchanged
inspection-result-detached-json-safe
inspection-journal-bounded
mixed-button-raycast-repeats-remain-idempotent
```

## Implementation order

```txt
1. StoryManifest schema, indexes, validation, and fingerprint
2. StorySnapshot schema, migration, reconciliation, and persistence results
3. InspectionCommand, pick observation, canonical resolution, and typed result
4. Scene-scoped inspection receipts, clue provenance, and completion proof
5. Atomic inspection persistence and projection transaction
6. Dual-ingress fixtures and browser parity smoke
7. Continue proof consumption and atomic story/stage transition
8. Runtime session lifecycle and resource retirement
9. Committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse Inspection Command Authority
+ Scene Completion Proof and Dual-Ingress Parity Fixture Gate
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
