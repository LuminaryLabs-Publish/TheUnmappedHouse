# Next steps: The Unmapped House

Timestamp: `2026-07-11T21-48-44-04-00`

## Goal

Preserve the current three-scene story, 450 ms pacing, fixed 16:9 composition, side-panel accessibility path and visible rendering while making authored content, persistence, picking, inspection, transitions, lifecycle and frame proof deterministic.

## Plan ledger

### 1. Canonical StoryManifest

- [ ] Create one root `StoryManifest` instead of separate title and scenes exports.
- [ ] Add stable manifest id, schema version, content version and deterministic fingerprint.
- [ ] Declare one initial scene id and an explicit terminal policy.
- [ ] Validate unique scene ids and scene-scoped hotspot ids.
- [ ] Build canonical scene, hotspot, clue, requirement and successor indexes.
- [ ] Replace array-position progression with explicit successor edges.
- [ ] Validate every successor target and reject cycles unless explicitly supported.
- [ ] Validate each grant and requirement against the canonical clue index.
- [ ] Validate requirement ownership and reachability.
- [ ] Validate camera, stage, geometry, material, post and hotspot descriptors.
- [ ] Canonicalize ordering before fingerprinting.
- [ ] Deep-freeze the admitted definition graph.
- [ ] Return typed accepted, rejected and failed admission results.
- [ ] Expose detached manifest observations and a bounded journal.

### 2. Versioned StorySnapshot startup authority

- [ ] Replace the raw `.v1` object with a versioned envelope citing manifest id and fingerprint.
- [ ] Separate read, parse, migration, structural admission, semantic admission, reconciliation and commit results.
- [ ] Reconcile unknown scene, hotspot and clue ids explicitly.
- [ ] Never render one scene while retaining a different unresolved `state.sceneId`.
- [ ] Retain malformed or rejected raw input without automatic overwrite.
- [ ] Delay StageKit allocation until both manifest and snapshot candidates are accepted.
- [ ] Prepare stage and UI off-line under one bootstrap generation.
- [ ] Roll back candidate resources on preparation, persistence, projection or first-frame failure.
- [ ] Publish typed load, save, clear, reset, rollback and first-frame results.

### 3. Pointer observation and hotspot-pick authority

- [ ] Replace `mousemove` and ambient click picking with one pointer-event adapter.
- [ ] Capture activation coordinates from the activation event itself.
- [ ] Add monotonic pointer sample ids and explicit input modality.
- [ ] Bind every sample to admitted manifest, scene, stage, surface, camera, hotspot-set, context, resource and frame identities.
- [ ] Return canonical hotspot ids rather than mutable descriptors.
- [ ] Make side-panel and canvas activation produce one shared command/result shape.

### 4. Inspection and completion proof

- [ ] Replace descriptor ingress with id-only `InspectionCommand` values.
- [ ] Resolve canonical hotspots from the admitted manifest.
- [ ] Record immutable inspection receipts and clue provenance.
- [ ] Derive one `SceneCompletionProof` from current-scene receipts and admitted requirements.

### 5. Atomic Continue transition

- [ ] Resolve the successor through the admitted successor graph.
- [ ] Reject Continue from explicit terminal scenes.
- [ ] Add command, proof, revision, transition and stage identities.
- [ ] Build successor story and stage candidates without mutating live state.
- [ ] Persist and commit story, UI, stage, camera, fog, hotspots and post settings atomically.
- [ ] Acknowledge the first visible successor frame.
- [ ] Retire predecessor resources only after acknowledgement.
- [ ] Roll back to predecessor authority on failure.

### 6. Runtime lifecycle and scene-resource retirement

- [ ] Add stable `sessionId` and monotonic `sessionGeneration`.
- [ ] Fence boot, pointer, inspection, timeout, reset, retry, resize, context and frame work.
- [ ] Retain RAF, listener, timeout, stage, renderer, canvas, target and context leases.
- [ ] Inventory and dispose scene and post resources.
- [ ] Add ordered idempotent stop, reset, restart and dispose results.

### 7. Render Surface Resolution Authority

- [ ] Separate CSS aspect-frame composition from internal render resolution.
- [ ] Add immutable quality tiers and allocation budgets.
- [ ] Commit CSS frame, camera projection, renderer buffer, target, post binding and pointer-surface revision as one surface revision.
- [ ] Acknowledge the first visible frame for each committed surface revision.

### 8. WebGL Context Recovery Authority

- [ ] Add canonical context states and monotonic context/resource generations.
- [ ] Suspend ready-frame commits and pointer admission after accepted loss.
- [ ] Rebuild one complete replacement resource generation.
- [ ] Render and acknowledge one recovered visible frame before returning to ready.

### 9. Committed-frame diagnostics

- [ ] Correlate manifest fingerprint, snapshot revision, scene id, stage epoch, surface revision, camera revision, hotspot-set revision, context generation, resource generation and frame id.
- [ ] Expose detached clone-safe observations.
- [ ] Record bootstrap, activation, transition, resize, recovery, rollback and retirement acknowledgements.

## Required StoryManifest fixture rows

```txt
manifest-root-required
manifest-id-required
schema-version-supported
content-version-present
initial-scene-resolves
scene-ids-unique
hotspot-ids-unique-per-scene
all-grants-resolve-known-clues
all-requirements-resolve-known-clues
requirements-have-declared-owner
requirements-are-reachable
all-nonterminal-scenes-have-one-successor
all-successors-resolve
terminal-scenes-explicit
unsupported-cycle-rejected
camera-vectors-finite
geometry-dimensions-positive-finite
material-colors-valid
post-values-finite-and-bounded
canonical-order-stable
fingerprint-stable-across-equivalent-input
fingerprint-changes-on-semantic-change
admitted-manifest-deep-frozen
legacy-adapter-preserves-current-three-scenes
manifest-observation-detached-json-safe
manifest-journal-bounded
manifest-to-stage-plan-fingerprint-equal
manifest-to-first-frame-fingerprint-equal
```

## Browser manifest smoke

```txt
admit the current three-scene story
capture manifest id, version and fingerprint
boot from an empty save
boot from each valid scene id
inject an unknown saved scene id and verify explicit reconciliation
attempt duplicate scene and hotspot ids and verify rejection before StageKit allocation
attempt unknown clue requirements and verify rejection before runtime mutation
attempt malformed camera and geometry values and verify rejection
attempt descriptor mutation after admission and verify it cannot change the frozen graph
advance through explicit successor edges to the explicit terminal scene
verify each visible frame cites the admitted manifest fingerprint
```

## Implementation order

```txt
1. StoryManifest authority
2. StorySnapshot startup admission and typed persistence authority
3. Pointer Observation and Hotspot Pick Authority
4. Inspection and scene-completion proof authority
5. Atomic Continue transition authority
6. Runtime session lifecycle and scene-resource retirement
7. Render Surface Resolution Authority
8. WebGL Context Recovery Authority
9. Committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse StoryManifest Authority
+ Schema / Canonical Index / Successor Graph / Freeze / Fingerprint / Render-Parity Fixture Gate
```

## Do not do first

```txt
new rooms or branches
inventory
audio or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```
